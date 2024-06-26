import requests
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile

# Replace with your actual values
INTRA_AUTHORIZE_URL = "https://api.intra.42.fr/oauth/authorize"
INTRA_TOKEN_URL = "https://api.intra.42.fr/oauth/token"
INTRA_USER_INFO_URL = "https://api.intra.42.fr/v2/me"
CLIENT_ID = 'u-s4t2ud-b2428ca60b90c222bcc76967f7644981bf460808d310c10d5219a21fe72de8bc'
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

    token_response = requests.post(INTRA_TOKEN_URL, data=token_data)
    if token_response.status_code != 200:
        return Response({"error": "Failed to obtain access token"}, status=token_response.status_code)

    token_response_data = token_response.json()
    access_token = token_response_data['access_token']

    user_info_response = requests.get(INTRA_USER_INFO_URL, headers={
        'Authorization': f'Bearer {access_token}'
    })
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

    if created:
        UserProfile.objects.create(user=user)

    refresh = RefreshToken.for_user(user)
    return Response({
        'access_token': str(refresh.access_token),
        'refresh_token': str(refresh),
    })


@api_view(['GET'])
def me(request):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "Invalid token or user not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    # Ensure the user has a UserProfile
    user_profile, created = UserProfile.objects.get_or_create(user=user)

    user_data = {
        'username': user.username,
        # 'first_name': user.first_name,
        # 'last_name': user.last_name,
        # 'email': user.email,
        'language_preference': user_profile.language_preference,
        'is_2fa_enabled': user_profile.is_2fa_enabled,
    }
    return Response(user_data)


@api_view(['POST'])
def save_prefs(request):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "Invalid token or user not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    user_profile = user.userprofile

    user_profile.preferences = request.data.get('preferences', user_profile.preferences)
    user_profile.language_preference = request.data.get('language_preference', user_profile.language_preference)
    user_profile.is_2fa_enabled = request.data.get('is_2fa_enabled', user_profile.is_2fa_enabled)

    user_profile.save()
    return Response({"success": True})
