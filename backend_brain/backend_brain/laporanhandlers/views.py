from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..apps.models import Laporan
from .serializers import CardLaporanSerializer, DetailLaporanSerializer

@api_view(['GET'])
def cardLaporan(request):
    if request.method == 'GET':
        laporan = Laporan.objects.values('id_laporan', 'gambar', 'jenis', 'judul', 'deskripsi', 'tgl_lapor').order_by('-tgl_lapor')
        serializers = CardLaporanSerializer(laporan, many=True)
        return Response(serializers.data)
    
@api_view(['GET'])
def detailLaporan(request, id_laporan):
    if request.method == 'GET':
        laporan = Laporan.objects.get(id_laporan=id_laporan)
        serializers = DetailLaporanSerializer(laporan)
        return Response(serializers.data)