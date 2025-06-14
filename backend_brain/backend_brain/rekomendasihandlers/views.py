from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..apps.models import Rekomendasi, Laporan, Peta, StatusRekomendasi
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRekomendasiBeranda(request):
    if request.method == 'GET':
        rekomendasi_list = Rekomendasi.objects.values(
            'id_rekomendasi', 'tingkat_urgent', 'status_urgent', 'id_laporan').order_by('tingkat_urgent')[:5]

        hasil = []
        for rekom in rekomendasi_list:
            try:
                peta = Peta.objects.get(id_laporan=rekom['id_laporan'])
                laporan = Laporan.objects.get(id_laporan=rekom['id_laporan'])
                status = StatusRekomendasi.objects.get(
                    id_rekomendasi=rekom['id_rekomendasi'])

                hasil.append({
                    'id_rekomendasi': rekom['id_rekomendasi'],
                    'tingkat_urgent': rekom['tingkat_urgent'],
                    'status_urgent': rekom['status_urgent'],
                    'jenis': laporan.jenis,
                    'alamat': peta.alamat,
                    'status': status.status,
                })
            except Peta.DoesNotExist:
                continue
            except StatusRekomendasi.DoesNotExist:
                continue

        return Response(hasil)
    
@api_view(['GET'])
def utamaRekomendasi(request):
    if request.method == 'GET':
        rekomendasi_list = Rekomendasi.objects.values(
            'id_rekomendasi', 'tingkat_urgent', 'status_urgent', 'id_laporan').order_by('tingkat_urgent')[:4]

        hasil = []
        for rekom in rekomendasi_list:
            try:
                peta = Peta.objects.get(id_laporan=rekom['id_laporan'])
                laporan = Laporan.objects.get(id_laporan=rekom['id_laporan'])
                status = StatusRekomendasi.objects.get(
                    id_rekomendasi=rekom['id_rekomendasi'])

                hasil.append({
                    'id_rekomendasi': rekom['id_rekomendasi'],
                    'tingkat_urgent': rekom['tingkat_urgent'],
                    'status_urgent': rekom['status_urgent'],
                    'jenis': laporan.jenis,
                    'alamat': peta.alamat,
                    'status': status.status,
                })
            except Peta.DoesNotExist:
                continue
            except StatusRekomendasi.DoesNotExist:
                continue

        return Response(hasil)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRekomendasiRequest(request):
    if request.method == 'GET':
        filter_by = request.query_params.get('filterby', '')
        search_query = request.query_params.get('search', '')

        order_field = '-tingkat_urgent'
        if filter_by == 'tinggi':
            order_field = '-tingkat_urgent'
        elif filter_by == 'rendah':
            order_field = 'tingkat_urgent'

        rekomendasi_list = Rekomendasi.objects.values(
            'id_rekomendasi', 'tingkat_urgent', 'status_urgent', 'id_laporan'
        ).order_by(order_field)

        hasil = []

        for rekom in rekomendasi_list:
            try:
                peta = Peta.objects.get(id_laporan=rekom['id_laporan'])
                laporan = Laporan.objects.get(id_laporan=rekom['id_laporan'])

                hasil.append({
                    'id_rekomendasi': rekom['id_rekomendasi'],
                    'tingkat_urgent': rekom['tingkat_urgent'],
                    'status_urgent': rekom['status_urgent'],
                    'judul': laporan.judul,
                    'jenis': laporan.jenis,
                    'alamat': peta.alamat,
                })
            except (Peta.DoesNotExist, Laporan.DoesNotExist):
                continue

        if search_query:
            hasil = [item for item in hasil if
                     search_query.lower() in item['status_urgent'].lower() or
                     search_query.lower() in item['judul'].lower() or
                     search_query.lower() in item['jenis'].lower() or
                     search_query.lower() in item['alamat'].lower()
                     ]

        return Response(hasil)