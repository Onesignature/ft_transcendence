import os
import logging
from django.shortcuts import redirect
from django.conf import settings
from requests_oauthlib import OAuth2Session
from django.http import JsonResponse, HttpResponse
import requests
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from oauthlib.oauth2 import AccessDeniedError

# Enable insecure transport for development
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

User = get_user_model()
logger = logging.getLogger(__name__)

def oauth_login(request):
    oauth = OAuth2Session(settings.OAUTH2_CLIENT_ID, redirect_uri=settings.OAUTH2_REDIRECT_URI)
    authorization_url, state = oauth.authorization_url(settings.OAUTH2_AUTHORIZATION_URL)
    request.session['oauth_state'] = state
    logger.debug(f"Authorization URL: {authorization_url}")
    return redirect(authorization_url)

def oauth_callback(request):
    error = request.GET.get('error')
    if error:
        error_description = request.GET.get('error_description', 'No description provided')
        return HttpResponse(f"Authorization denied: {error_description}", status=400)

    try:
        oauth = OAuth2Session(settings.OAUTH2_CLIENT_ID, state=request.session['oauth_state'], redirect_uri=settings.OAUTH2_REDIRECT_URI)
        token = oauth.fetch_token(settings.OAUTH2_TOKEN_URL, client_secret=settings.OAUTH2_CLIENT_SECRET, authorization_response=request.build_absolute_uri())
        request.session['oauth_token'] = token

        user_info_response = requests.get(settings.OAUTH2_USER_INFO_URL, headers={'Authorization': f'Bearer {token["access_token"]}'})
        user_info = user_info_response.json()
        logger.debug(f"User Info: {user_info}")

        username = user_info.get('login')
        email = user_info.get('email')
        user, created = User.objects.get_or_create(username=username, defaults={'email': email})

        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    except AccessDeniedError as e:
        logger.error(f"Access denied: {e}")
        return HttpResponse("Access denied by the user", status=400)

@api_view(['POST'])
def create_jwt_token(request):
    user_info = request.data

    user, created = User.objects.get_or_create(username=user_info['username'], defaults={'email': user_info['email']})

    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })
