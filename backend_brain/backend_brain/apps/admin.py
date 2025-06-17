from django.contrib import admin
from .models import Pengguna, Laporan, Peta, Rekomendasi, StatusRekomendasi

admin.site.register(Pengguna)
admin.site.register(Laporan)
admin.site.register(Peta)
admin.site.register(Rekomendasi)
admin.site.register(StatusRekomendasi)