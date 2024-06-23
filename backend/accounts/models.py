# accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    ENGLISH = 'EN'
    FRENCH = 'FR'
    SPANISH = 'ES'

    LANGUAGE_CHOICES = [
        (ENGLISH, 'English'),
        (FRENCH, 'French'),
        (SPANISH, 'Spanish'),
    ]

    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    two_factor_enabled = models.BooleanField(default=False)
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default=ENGLISH)

    last_login = None

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.username
