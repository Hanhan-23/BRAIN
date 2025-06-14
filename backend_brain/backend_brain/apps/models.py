from django.db import models
from django.contrib.auth.models import User

class Pemerintah(models.Model):
    STATUS_PENGGUNA = [
        ('aktif', 'Aktif'),
        ('tangguh', 'Ditangguhkan'),
    ]

    id_pemerintah = models.AutoField(primary_key=True)
    nama_lengkap = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    foto_profil = models.URLField(null=True, blank=True)
    google_id = models.CharField(
        max_length=50, unique=True, null=True, blank=True)
    tgl_bergabung = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=15,
        choices=STATUS_PENGGUNA,
        null=True, blank=True
    )

    class Meta:
        db_table = 'pemerintah'


class Masyarakat(models.Model):
    
    STATUS_PENGGUNA = [
        ('aktif', 'Aktif'),
        ('tangguh', 'Ditangguhkan'),
    ]

    id_masyarakat = models.AutoField(primary_key=True)
    nama_lengkap = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(unique=True)
    foto_profil = models.URLField(null=True, blank=True)
    google_id = models.CharField(
        max_length=50, unique=True, null=True, blank=True)
    tgl_bergabung = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=15,
        choices=STATUS_PENGGUNA,
        null=True, blank=True
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='masyarakat_profile')

    class Meta:
        db_table = 'masyarakat'


class Laporan(models.Model):
    JENIS_CHOICES = [
        ('jalan', 'Jalan'),
        ('lampu_jalan', 'Lampu Jalan'),
        ('jembatan', 'Jembatan'),
    ]

    CUACA_CHOICES = [
        ('hujan', 'Hujan'),
        ('cerah', 'Cerah'),
    ]

    id_laporan = models.AutoField(primary_key=True)
    id_masyarakat = models.ForeignKey(
        Masyarakat,
        on_delete=models.CASCADE,
        related_name='masyarakatlaporan',
        null=True, blank=True
    )
    judul = models.CharField(max_length=40, null=True, blank=True)
    jenis = models.CharField(
        max_length=15,
        choices=JENIS_CHOICES,
        null=True, blank=True
    )
    deskripsi = models.CharField(max_length=80, null=True, blank=True)
    cuaca = models.CharField(
        max_length=15,
        choices=CUACA_CHOICES,
        null=True, blank=True
    )
    nilai_kerusakan = models.FloatField(null=True, blank=True)
    gambar = models.ImageField(
        upload_to=None, height_field=None, width_field=None, max_length=None, null=True, blank=True)
    tgl_lapor = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'laporan'


class Peta(models.Model):
    id_peta = models.AutoField(primary_key=True)
    id_laporan = models.OneToOneField(
        Laporan, on_delete=models.CASCADE, related_name='laporanpeta', null=True, blank=True)
    alamat = models.CharField(max_length=255, null=True, blank=True)
    jalan = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()

    class Meta:
        db_table = 'peta'


class Rekomendasi(models.Model):
    STATUS_URGENT_CHOICHES = [
        ('tinggi', 'Tinggi'),
        ('sedang', 'Sedang'),
        ('rendah', 'Rendah'),
    ]

    id_rekomendasi = models.AutoField(primary_key=True)
    id_laporan = models.ForeignKey(
        Laporan, on_delete=models.CASCADE, related_name='laporanrekomendasi', null=True, blank=True
    )
    tingkat_urgent = models.FloatField()
    status_urgent = models.CharField(
        max_length=15,
        choices=STATUS_URGENT_CHOICHES,
        null=True, blank=True
    )
    tgl_rekom = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'rekomendasi'


class StatusRekomendasi(models.Model):
    STATUS_CHOICES = [
        ('belum_valid', 'Belum Divalidasi'),
        ('valid', 'Divalidasi'),
        ('proses', 'Diproses'),
        ('selesai', 'Selesai'),
    ]

    id_status_rekomendasi = models.AutoField(primary_key=True)
    id_rekomendasi = models.ForeignKey(
        Rekomendasi, on_delete=models.CASCADE, related_name='rekomendasistatus', null=True, blank=True)
    status = models.CharField(
        max_length=15,
        choices=STATUS_CHOICES,
        null=True, blank=True
    )
    tgl_rekomendasi = models.DateTimeField(auto_now_add=True)
    oleh = models.ForeignKey(
        Pemerintah, on_delete=models.CASCADE, related_name='pemerintahstatus', null=True, blank=True)

    class Meta:
        db_table = 'status_laporan'