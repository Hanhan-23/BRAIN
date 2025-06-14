from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..apps.models import Laporan
from .serializers import CardLaporanSerializer, DetailLaporanSerializer
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated


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
        laporan = Laporan.objects.get(id_laporan=id_laporan)
        serializers = DetailLaporanSerializer(laporan)
        return Response(serializers.data)


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