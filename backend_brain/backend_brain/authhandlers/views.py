import requests
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from allauth.socialaccount.models import SocialAccount
from backend_brain.apps.models import Pengguna
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

User = get_user_model()

class GoogleLoginView(APIView):
    def post(self, request):
        access_token = request.data.get('access_token')

        if access_token is None:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        google_response = requests.get(f'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token={access_token}')
        if google_response.status_code != 200:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        user_info = google_response.json()
        email = user_info['email']
        name = user_info.get('name', '')
        picture = user_info.get('picture', '')
        google_id = user_info.get('id')

        user, created = User.objects.get_or_create(email=email, defaults={'username': email, 'first_name': name})

        if not hasattr(user, 'masyarakat_profile'):
            Pengguna.objects.create(
                user=user,
                nama_lengkap=name,
                email=email,
                foto_profil=picture,
                google_id=google_id,
                peran='masyarakat',
                status='aktif'
            )
            print(f"[DEBUG] Profil masyarakat dibuat untuk {user.username}")
        else:
            print(f"[DEBUG] Profil masyarakat sudah ada untuk {user.username}")

        refresh = RefreshToken.for_user(user)

        return Response({
            'status': 'success',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'peran': user.masyarakat_profile.peran,
            'user': {
                'email': user.email,
                'nama_lengkap': user.masyarakat_profile.nama_lengkap,
                'foto_profil': user.masyarakat_profile.foto_profil
            }
        })
    
class GoogleRefreshToken(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh')

        if not refresh_token:
            return Response({'error': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)

            return Response({
                'access': new_access_token
            }, status=status.HTTP_200_OK)

        except TokenError as e:
            return Response({'error': 'Invalid refresh token.'}, status=status.HTTP_401_UNAUTHORIZED)
