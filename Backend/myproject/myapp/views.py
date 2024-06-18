# myapp/views.py

from django.shortcuts import redirect, render
from django.conf import settings
import requests
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

def home(request):
    if request.user.is_authenticated:
        return HttpResponse(f'<h1>Welcome {request.user.username}!</h1><a href="/logout">Logout</a>')
    else:
        return HttpResponse('<h1>Welcome to the Home Page</h1><a href="/oauth2/login">Login with 42</a>')

def oauth2_login(request):
    client_id = 'u-s4t2ud-a57fd10d86263d97f33e6d1a5482ab5e079b74cbacab8a8cb4a6a969797cb8a1'  # Replace with your actual client_id
    redirect_uri = f'{settings.SITE_URL}/oauth2/callback'
    authorize_url = f'https://api.intra.42.fr/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope=public'
    return redirect(authorize_url)

def oauth2_callback(request):
    code = request.GET.get('code')
    token_url = 'https://api.intra.42.fr/oauth/token'
    client_id = 'u-s4t2ud-a57fd10d86263d97f33e6d1a5482ab5e079b74cbacab8a8cb4a6a969797cb8a1'  # Replace with your actual client_id
    client_secret = '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'  # Replace with your actual client_secret
    redirect_uri = f'{settings.SITE_URL}/oauth2/callback'
    
    token_data = {
        'grant_type': 'authorization_code',
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'redirect_uri': redirect_uri,
    }
    
    token_response = requests.post(token_url, data=token_data)
    token_json = token_response.json()
    
    if 'access_token' not in token_json:
        return HttpResponse(f"Error obtaining access token: {token_json}", status=400)
    
    access_token = token_json['access_token']
    
    user_info_url = 'https://api.intra.42.fr/v2/me'
    user_info_response = requests.get(user_info_url, headers={'Authorization': f'Bearer {access_token}'})
    user_info = user_info_response.json()
    
    # Use user_info to create or update user in your system
    username = user_info['login']
    email = user_info['email']
    
    user, created = User.objects.get_or_create(username=username, defaults={'email': email})
    if created:
        user.set_unusable_password()
        user.save()
    
    login(request, user)
    return redirect('/')

def logout_view(request):
    logout(request)
    return redirect('/')
