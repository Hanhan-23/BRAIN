from rest_framework.decorators import api_view
from ..apps.models import Laporan, Rekomendasi, StatusRekomendasi
from django.db.models import F, Q, OuterRef, Subquery
from rest_framework.response import Response


@api_view(['GET'])
def berandaAnalisis(request):
    if request.method == 'GET':

        status_selesai = StatusRekomendasi.objects.filter(
            status__icontains='selesai').values_list('id_rekomendasi', flat=True).distinct()

        # handler status rekomendasi
        latest_status = StatusRekomendasi.objects.filter(
            Q(id_rekomendasi=OuterRef('id_rekomendasi')) & ~Q(
                status__icontains='selesai')
        ).order_by('-tgl_rekomendasi')

        status_laporan = StatusRekomendasi.objects.exclude(
            id_rekomendasi__in=status_selesai
        ).filter(
            id_status_rekomendasi = Subquery(latest_status.values('id_status_rekomendasi')[:1])
        ).values('id_rekomendasi', 'status', 
            id_laporan=F('id_rekomendasi__id_laporan'),  
            cluster=F('id_rekomendasi__id_laporan__cluster')    
        )

        cluster_list = status_laporan.values_list('cluster', flat=True).distinct()

        #final total laporan masuk
        total_laporan = Laporan.objects.filter(cluster__in=cluster_list).count()

        total_rekomendasi_valid = status_laporan.filter(status='valid').count()
        total_rekomendasi_belumvalid = status_laporan.filter(status='belum_valid').count()

        return Response({
            # 'status_laporan': list(status_laporan),
            'total_laporan_terkini': total_laporan,
            'total_rekomendasi_terkini': status_laporan.count(),
            'total_rekomendasi_valid': total_rekomendasi_valid,
            'total_rekomendasi_belumvalid': total_rekomendasi_belumvalid
        })
    

@api_view(['GET'])
def statistikLaporanPemerintah(request):
        if request.method == 'GET':
            return Response('ok')