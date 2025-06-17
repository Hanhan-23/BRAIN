from rest_framework.decorators import api_view, permission_classes
from ..apps.models import Laporan, Rekomendasi, StatusRekomendasi
from django.db.models import F, Q, OuterRef, Subquery
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models.functions import TruncDate
from django.db.models import Count


@api_view(['GET'])
@permission_classes([IsAuthenticated])
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
            id_status_rekomendasi=Subquery(
                latest_status.values('id_status_rekomendasi')[:1])
        ).values('id_rekomendasi', 'status',
                 id_laporan=F('id_rekomendasi__id_laporan'),
                 cluster=F('id_rekomendasi__id_laporan__cluster')
                 )

        cluster_list = status_laporan.values_list(
            'cluster', flat=True).distinct()

        # final total laporan masuk
        total_laporan = Laporan.objects.filter(
            cluster__in=cluster_list).count()

        total_rekomendasi_valid = status_laporan.filter(status='valid').count()
        total_rekomendasi_belumvalid = status_laporan.filter(
            status='belum_valid').count()

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
        laporan_per_hari = (
            Laporan.objects
            .annotate(date=TruncDate('tgl_lapor'))
            .values('date', 'jenis')
            .annotate(total=Count('id_laporan'))
            .order_by('date')
        )

        data_chart = {}

        for laporan in laporan_per_hari:
            date_str = laporan['date'].strftime('%Y-%m-%d')
            jenis = laporan['jenis']
            total = laporan['total']

            if date_str not in data_chart:
                data_chart[date_str] = {'date': date_str,
                                        'jalan': 0, 'lampu': 0, 'jembatan': 0}

            data_chart[date_str][jenis] = total

        result = list(data_chart.values())

        return Response(result)


@api_view(['GET'])
def rekomendasiBerandaPemerintah(request):
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
            id_status_rekomendasi=Subquery(
                latest_status.values('id_status_rekomendasi')[:1])
        ).values('id_rekomendasi', 'status',
                 status_urgent=F('id_rekomendasi__status_urgent'),
                 id_laporan=F('id_rekomendasi__id_laporan'),
                 judul=F('id_rekomendasi__id_laporan__judul'),
                 gambar=F('id_rekomendasi__id_laporan__gambar'),
                 alamat=F('id_rekomendasi__id_laporan__laporanpeta__alamat'),
                 cluster=F('id_rekomendasi__id_laporan__cluster'),
                 ).order_by('-id_rekomendasi__tingkat_urgent')
        
        # Hitung total laporan per cluster
        laporan_per_cluster = Laporan.objects.values('cluster').annotate(total=Count('id_laporan'))
        total_per_cluster = {item['cluster']: item['total'] for item in laporan_per_cluster}

        # Ubah queryset ke list dan tambahkan total laporan per cluster
        status_laporan = list(status_laporan)
        for item in status_laporan:
            cluster_id = item['cluster']
            item['total_laporan_cluster'] = total_per_cluster.get(cluster_id, 0)
        

        return Response(status_laporan[:3])
