from django.urls import path
from . import views
from .views import oauth_login, oauth_callback, create_jwt_token, protected_view

urlpatterns = [
    path('oauth/login/', views.oauth_login, name='oauth_login'),
    path('oauth/callback/', views.oauth_callback, name='oauth_callback'),
    path('api/token/', create_jwt_token, name='create_jwt_token'),
    path('protected/', protected_view, name='protected_view'),
]
