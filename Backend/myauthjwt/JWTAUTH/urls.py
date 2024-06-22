from django.urls import path
from . import views
from .views import create_jwt_token

urlpatterns = [
    path('oauth/login/', views.oauth_login, name='oauth_login'),
    path('oauth/callback/', views.oauth_callback, name='oauth_callback'),
    path('api/token/', create_jwt_token, name='create_jwt_token'),
]
