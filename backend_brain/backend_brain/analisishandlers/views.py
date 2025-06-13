from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..apps.models import Laporan, Rekomendasi
from django.db.models import Count

@api_view(['GET'])
def analisisBeranda(request):
    if request.method == 'GET':
        laporan = Laporan.objects.count()
        rekomendasi = Rekomendasi.objects.count()

        dominant = Laporan.objects.values('jenis').annotate(total=Count('jenis')).order_by('-total').first()

        return Response({
            'jumlah_laporan': laporan,
            'jumlah_rekomendasi': rekomendasi,
            'jumlah_dominant': dominant
        })
