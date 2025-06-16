from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from ..apps.models import Laporan, Peta, StatusRekomendasi
from .serializers import CardLaporanSerializer, DetailLaporanSerializer
from ..petahandlers.serializers import DetailLaporanPetaSerializers
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from django.db.models.functions import TruncDate
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def buatLaporan(request):
    try:
        laporan = Laporan.objects.create(
            judul=request.data.get('judul'),
            jenis=request.data.get('jenis'),
            deskripsi=request.data.get('deskripsi'),
            cuaca=request.data.get('cuaca'),
            nilai_kerusakan=float(request.data.get('nilai_kerusakan')) if request.data.get('nilai_kerusakan') else None,
            gambar=request.data.get('gambar'),
            cluster=request.data.get('cluster'),
        )

        if laporan.nilai_kerusakan is not None and (laporan.nilai_kerusakan < 0 or laporan.nilai_kerusakan > 100):
            laporan.delete()
            return Response({'status': 'failed', 'message': 'Nilai kerusakan harus di antara 0 - 100.'},
                            status=status.HTTP_400_BAD_REQUEST)

        alamat = request.data.get('alamat')
        jalan = request.data.get('jalan')
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')

        if alamat or jalan or latitude or longitude:
            Peta.objects.create(
                id_laporan=laporan,
                alamat=alamat,
                jalan=jalan,
                latitude=latitude,
                longitude=longitude
            )

        return Response({
            'status': 'success',
            'laporan': laporan.id_laporan
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({
            'status': 'failed',
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cardLaporan(request):
    if request.method == 'GET':
        laporan = Laporan.objects.values(
            'id_laporan', 'gambar', 'jenis', 'judul', 'deskripsi', 'tgl_lapor').order_by('-tgl_lapor')
        serializers = CardLaporanSerializer(laporan, many=True)
        return Response(serializers.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def detailLaporan(request, id_laporan):
    if request.method == 'GET':
        peta = Peta.objects.get(id_laporan=id_laporan)
        laporan = Laporan.objects.get(id_laporan=id_laporan)
        serializerslaporan = DetailLaporanSerializer(laporan)
        serializerspeta = DetailLaporanPetaSerializers(peta)
        return Response({
            "laporan": serializerslaporan.data,
            "peta": serializerspeta.data
        })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cardLaporanRequest(request):
    if request.method == 'GET':

        search_query = request.query_params.get('search', '')

        laporan = Laporan.objects.values(
            'id_laporan', 'gambar', 'jenis', 'judul', 'deskripsi', 'tgl_lapor').order_by('-tgl_lapor')

        laporan = laporan.filter(
            Q(judul__icontains=search_query) |
            Q(jenis__icontains=search_query) |
            Q(deskripsi__icontains=search_query)
        )

        serializer = CardLaporanSerializer(laporan, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def BerandaLaporanSaya(request):
    if request.method == 'GET':
        daftar_laporan = Laporan.objects.values('judul', 'tgl_lapor', 'id_masyarakat').order_by('-tgl_lapor')
        
        return Response(daftar_laporan)
    

@api_view(['GET'])
def cardLaporanUtama(request):
    if request.method == 'GET':
        laporan = Laporan.objects.values(
            'id_laporan', 'gambar', 'jenis', 'judul', 'deskripsi', 'tgl_lapor').order_by('-tgl_lapor')[:4]
        serializers = CardLaporanSerializer(laporan, many=True)
        return Response(serializers.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cardHistoryLaporan(request):
    user = request.user
    if request.method == 'GET':
        laporan = Laporan.objects.values(
            'id_laporan', 'judul','tgl_lapor'
        ).filter(id_masyarakat__user=user).order_by('-tgl_lapor')
        return Response(laporan)


@api_view(['GET'])
def statistikLaporanUtama(request):
    if request.method == 'GET':
        laporan_per_hari = (
            Laporan.objects
            .annotate(date=TruncDate('tgl_lapor'))
            .values('date')
            .annotate(laporanmasuk=Count('id_laporan'))
            .order_by('date')
        )

        valid_per_hari = (
            StatusRekomendasi.objects
            .filter(status='valid')
            .annotate(date=TruncDate('id_rekomendasi__id_laporan__tgl_lapor'))
            .values('date')
            .annotate(laporanvalid=Count('id_status_rekomendasi'))
            .order_by('date')
        )

        valid_dict = {str(item['date']): item['laporanvalid'] for item in valid_per_hari}

        hasil = []
        for item in laporan_per_hari:
            tanggal = str(item['date'])
            hasil.append({
                'date': tanggal,
                'laporanmasuk': item['laporanmasuk'],
                'laporanvalid': valid_dict.get(tanggal, 0)
            })

        return Response(hasil)