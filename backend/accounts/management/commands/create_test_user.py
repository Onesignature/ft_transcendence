# accounts/management/commands/create_test_user.py
from django.core.management.base import BaseCommand
from accounts.models import CustomUser

class Command(BaseCommand):
    help = 'Create a test user to trigger signals'

    def handle(self, *args, **kwargs):
        user = CustomUser.objects.create_user(
            username='testuser1',
            password='password123',
            two_factor_enabled=False,
            language='EN'
        )
        self.stdout.write(self.style.SUCCESS(f'User "{user.username}" created successfully!'))
