from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    preferences = models.JSONField(default=dict)
    language_preference = models.CharField(max_length=10, default='EN')
    is_2fa_enabled = models.BooleanField(default=False)
