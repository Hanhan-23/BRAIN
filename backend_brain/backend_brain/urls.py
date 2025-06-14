"""
URL configuration for backend_brain project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backend_brain.apps import views as viewsapps
from backend_brain.laporanhandlers import views as viewslaporan
from backend_brain.rekomendasihandlers import views as viewsrekomendasi
from backend_brain.analisishandlers import views as viewsanalisis
from backend_brain.authhandlers.views import GoogleLoginView
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('timenow/', viewsapps.timenow),

    # Endpoint auth REST (login, logout, password reset, dsb.)
    path('auth/', include('dj_rest_auth.urls')), 

    # Endpoint registration (register biasa)
    path('auth/registration/', include('dj_rest_auth.registration.urls')),

    #Endpoint login google
    path('auth/google/', GoogleLoginView.as_view(), name='google-login'),

    # Halaman Utama
    path('cardsrekomendasi/', viewsrekomendasi.utamaRekomendasi, name='utamarekomendasi'),
    path('cardslaporan/', viewslaporan.cardLaporanUtama, name='cardlaporanutama'),

    # Beranda
    path('beranda/tabel-rekomendasi', viewsrekomendasi.getRekomendasiBeranda, name='tabelrekomendasiberanda'),
    path('beranda/analisis', viewsanalisis.analisisBeranda, name='analisisberanda'),
    path('beranda/laporansaya', viewslaporan.BerandaLaporanSaya, name='berandalaporansaya'),

    # Laporan
    path('laporan/cards/', viewslaporan.cardLaporan, name='cardlaporan'),
    path('laporan/detail/<int:id_laporan>/', viewslaporan.detailLaporan, name='detaillaporan'),
    path('laporan/cards', viewslaporan.cardLaporanRequest, name='cardlaporanrequest'),
    path('laporan/history', viewslaporan.cardHistoryLaporan, name='cardlaporanhistory'),

    # Rekomendasi
    path('rekomendasi/requests', viewsrekomendasi.getRekomendasiRequest, name='cardlaporan'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
