from django.urls import path
from .views import authorize, auth_token, me, save_prefs

urlpatterns = [
    path('oauth/authorize/', authorize, name='authorize'),
    path('oauth/authToken/', auth_token, name='auth_token'),
    path('me/', me, name='me'),
    path('save-prefs/', save_prefs, name='save_prefs'),
]