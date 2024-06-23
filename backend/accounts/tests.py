# accounts/tests.py
from django.test import TestCase
from .models import CustomUser

class CustomUserTests(TestCase):
    def setUp(self):
        self.user_data = {
            'username': 'testuser',
            'password': 'password123',
            'two_factor_enabled': False,
            'language': 'EN'
        }
        self.user = CustomUser.objects.create_user(**self.user_data)

    def test_create_user(self):
        self.assertEqual(CustomUser.objects.count(), 1)
        self.assertEqual(self.user.username, 'testuser')
        self.assertTrue(self.user.check_password('password123'))
        self.assertFalse(self.user.two_factor_enabled)
        self.assertEqual(self.user.language, 'EN')

    def test_update_user(self):
        self.user.username = 'updateduser'
        self.user.set_password('newpassword123')
        self.user.two_factor_enabled = True
        self.user.language = 'FR'
        self.user.save()

        self.user.refresh_from_db()
        self.assertEqual(self.user.username, 'updateduser')
        self.assertTrue(self.user.check_password('newpassword123'))
        self.assertTrue(self.user.two_factor_enabled)
        self.assertEqual(self.user.language, 'FR')
