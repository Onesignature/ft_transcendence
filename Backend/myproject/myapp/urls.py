# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('oauth2/login', views.oauth2_login, name='oauth2_login'),
    path('oauth2/callback', views.oauth2_callback, name='oauth2_callback'),
    path('logout', views.logout_view, name='logout'),
]
