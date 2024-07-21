import requests
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile
from .models import OTP
from .utils import create_and_send_otp
from datetime import datetime
from django.utils import timezone

# Replace with your actual values
INTRA_AUTHORIZE_URL = "https://api.intra.42.fr/oauth/authorize"
INTRA_TOKEN_URL = "https://api.intra.42.fr/oauth/token"
INTRA_USER_INFO_URL = "https://api.intra.42.fr/v2/me"
CLIENT_ID = 'u-s4t2ud-434210c1463ba59055ca161772f77b2fafc69b6e8f210036ffdb992f09b57f76'
CLIENT_SECRET = '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'
REDIRECT_URI = 'http://localhost:8000/oauth/callback/'


@api_view(['GET'])
@permission_classes([AllowAny])
def authorize(request):
    params = {
        'client_id': CLIENT_ID,
        'redirect_uri': REDIRECT_URI,
        'response_type': 'code',
        'scope': 'public',
        'prompt': 'login',  # Add this parameter to force login prompt
    }
    authorize_url = f"{INTRA_AUTHORIZE_URL}?{requests.compat.urlencode(params)}"
    return Response({"authorization_url": authorize_url})

@api_view(['POST'])
@permission_classes([AllowAny])
def auth_token(request):
    code = request.data.get('code')
    if not code:
        return Response({"error": "Code not provided"}, status=status.HTTP_400_BAD_REQUEST)

    token_data = {
        'grant_type': 'authorization_code',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'code': code,
        'redirect_uri': REDIRECT_URI,
    }

    # Log request data for debugging
    print("Token Request Data:", token_data)

    token_response = requests.post(INTRA_TOKEN_URL, data=token_data)

    # Log response for debugging
    print("Token Response Status Code:", token_response.status_code)
    print("Token Response Data:", token_response.json())

    if token_response.status_code != 200:
        return Response({"error": "Failed to obtain access token"}, status=token_response.status_code)

    token_response_data = token_response.json()
    access_token = token_response_data.get('access_token')
    if not access_token:
        return Response({"error": "Access token not found in the response"}, status=status.HTTP_400_BAD_REQUEST)

    user_info_response = requests.get(INTRA_USER_INFO_URL, headers={
        'Authorization': f'Bearer {access_token}'
    })

    # Log response for debugging
    print("User Info Response Status Code:", user_info_response.status_code)
    print("User Info Response Data:", user_info_response.json())

    if user_info_response.status_code != 200:
        return Response({"error": "Failed to fetch user information"}, status=user_info_response.status_code)

    user_info = user_info_response.json()

    user, created = User.objects.get_or_create(
        username=user_info['login'],
        defaults={
            'first_name': user_info['first_name'],
            'last_name': user_info['last_name'],
            'email': user_info['email'],
        }
    )

    # Check if the UserProfile already exists
    if not UserProfile.objects.filter(user=user).exists():
        UserProfile.objects.create(user=user)

    refresh = RefreshToken.for_user(user)
    return Response({
        'access_token': str(refresh.access_token),
        'refresh_token': str(refresh),
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user

    user_profile, created = UserProfile.objects.get_or_create(user=user)

    user_data = {
        'username': user.username,
        'language_preference': user_profile.language_preference,
        'is_2fa_enabled': user_profile.is_2fa_enabled,
    }
    return Response(user_data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_prefs(request):
    user = request.user

    user_profile = user.userprofile

    user_profile.preferences = request.data.get('preferences', user_profile.preferences)
    user_profile.language_preference = request.data.get('language_preference', user_profile.language_preference)
    user_profile.is_2fa_enabled = request.data.get('is_2fa_enabled', user_profile.is_2fa_enabled)

    user_profile.save()
    return Response({"success": True})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    print("Logout endpoint")
    try:
        refresh_token = request.data.get("refresh_token")
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"success": "Successfully logged out"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_otp(request):
    user = request.user
    if user.userprofile.is_2fa_enabled:
        create_and_send_otp(user)
        return Response({"success": "OTP sent to email"}, status=200)
    return Response({"error": "2FA is not enabled for this user"}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    username = request.data.get('username')
    otp = request.data.get('otp')

    try:
        user = User.objects.get(username=username)
        otp_instance = OTP.objects.get(user=user)
        
        if otp_instance.otp == otp and otp_instance.expires_at > timezone.now():
            return Response({"success": "OTP verified"}, status=200)
        return Response({"error": "Invalid or expired OTP"}, status=400)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    except OTP.DoesNotExist:
        return Response({"error": "OTP not found"}, status=404)