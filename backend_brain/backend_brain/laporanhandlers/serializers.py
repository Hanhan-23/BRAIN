from rest_framework import serializers

class CardLaporanSerializer(serializers.Serializer):
    id_laporan = serializers.IntegerField()
    gambar = serializers.CharField()
    jenis = serializers.CharField()
    judul = serializers.CharField()
    deskripsi = serializers.CharField()
    tgl_lapor = serializers.DateTimeField()


class DetailLaporanSerializer(serializers.Serializer):
    id_laporan = serializers.IntegerField()
    judul = serializers.CharField()
    jenis = serializers.CharField()
    deskripsi = serializers.CharField()
    cuaca = serializers.CharField()
    nilai_kerusakan = serializers.FloatField()
    gambar = serializers.CharField()
    tgl_lapor = serializers.DateTimeField()