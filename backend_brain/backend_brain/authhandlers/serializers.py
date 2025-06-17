# backend_brain/authhandlers/serializers.py

from dj_rest_auth.registration.serializers import SocialLoginSerializer
from allauth.socialaccount.models import SocialAccount
from backend_brain.apps.models import Pengguna

class CustomSocialLoginSerializer(SocialLoginSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        print(f"[DEBUG] Social login validate triggered for {user.username}")

        if not hasattr(user, 'masyarakat_profile'):
            social_account = SocialAccount.objects.filter(user=user, provider='google').first()
            google_id = social_account.uid if social_account else None

            Pengguna.objects.create(
                user=user,
                nama_lengkap=user.get_full_name(),
                email=user.email,
                google_id=google_id,
                peran = 'masyarakat',
                status='aktif'
            )
            print(f"[DEBUG] Masyarakat created for {user.username}")
        else:
            print(f"[DEBUG] Masyarakat already exists for {user.username}")

        return data
