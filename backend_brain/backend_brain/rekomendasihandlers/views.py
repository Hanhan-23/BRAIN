from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..apps.models import Rekomendasi, Laporan, Peta, StatusRekomendasi
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from rest_framework import status


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

                hasil.append({
                    'id_rekomendasi': rekom['id_rekomendasi'],
                    'tingkat_urgent': rekom['tingkat_urgent'],
                    'status_urgent': rekom['status_urgent'],
                    'gambar_laporan': laporan.gambar.name,
                    'judul_laporan': laporan.judul,
                    'jenis': laporan.jenis,
                    'alamat': peta.alamat,
                    'latitude': peta.latitude,
                    'longitude': peta.longitude,
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDetailRekomendasi(request, id_rekomendasi):
    if request.method == 'GET':
        try:
            rekomendasi = Rekomendasi.objects.get(
                id_rekomendasi=id_rekomendasi)

            laporan_pertama = Laporan.objects.get(
                id_laporan=rekomendasi.id_laporan.id_laporan)

            list_laporan = Laporan.objects.values(
                'id_laporan', 'gambar', 'jenis', 'judul', 'deskripsi', 'tgl_lapor', 'cluster'
            ).order_by('-tgl_lapor').filter(cluster=laporan_pertama.cluster)

            peta = Peta.objects.get(id_laporan=laporan_pertama.id_laporan)

            status_rekomendasi = StatusRekomendasi.objects.filter(
                id_rekomendasi=id_rekomendasi).values('id_status_rekomendasi', 'tgl_rekomendasi', 'status').order_by('-tgl_rekomendasi')

            response_data = {
                'rekomendasi': {
                    'id_rekomendasi': rekomendasi.id_rekomendasi,
                    'id_laporan': rekomendasi.id_laporan.id_laporan,
                    'tgl_rekom': rekomendasi.tgl_rekom,
                    'status_urgent': rekomendasi.status_urgent
                },
                'laporan_pertama': {
                    'id_laporan': laporan_pertama.id_laporan,
                    'judul': laporan_pertama.judul,
                    'deskripsi': laporan_pertama.deskripsi,
                    'gambar': laporan_pertama.gambar.url if laporan_pertama.gambar else None,
                    'tgl_lapor': laporan_pertama.tgl_lapor
                },
                'list_laporan': list(list_laporan),
                'peta': {
                    'id_peta': peta.id_peta,
                    'alamat': peta.alamat,
                    'latitude': peta.latitude,
                    'longitude': peta.longitude
                },
                'status': list(status_rekomendasi)
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Rekomendasi.DoesNotExist:
            return Response({'error': 'Rekomendasi tidak ditemukan.'}, status=status.HTTP_404_NOT_FOUND)
        except Laporan.DoesNotExist:
            return Response({'error': 'Laporan tidak ditemukan.'}, status=status.HTTP_404_NOT_FOUND)
        except Peta.DoesNotExist:
            return Response({'error': 'Peta tidak ditemukan.'}, status=status.HTTP_404_NOT_FOUND)
        except StatusRekomendasi.DoesNotExist:
            return Response({'error': 'Status rekomendasi tidak ditemukan.'}, status=status.HTTP_404_NOT_FOUND)
