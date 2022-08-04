from rest_framework.viewsets import ModelViewSet

from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserModelViewSet(ModelViewSet):
    serializer_class = CustomUserModelSerializer
    queryset = CustomUser.objects.all()
