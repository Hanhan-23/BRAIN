from django.contrib import admin
from .models import Pemerintah, Masyarakat ,Laporan, Peta, Rekomendasi, StatusRekomendasi

admin.site.register(Pemerintah)
admin.site.register(Masyarakat)
admin.site.register(Laporan)
admin.site.register(Peta)
admin.site.register(Rekomendasi)
admin.site.register(StatusRekomendasi)