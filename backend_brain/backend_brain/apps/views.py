from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone

@api_view(['GET'])
def timenow(request):
    if request.method == 'GET':
        waktu = timezone.now()
        return Response(waktu);