from rest_framework.viewsets import ModelViewSet

from .models import Author, CustomUser
from .serializers import AuthorModelSerializer, CustomUserModelSerializer


class AuthorModelViewSet(ModelViewSet):
    serializer_class = AuthorModelSerializer
    queryset = Author.objects.all()


class CustomUserModelViewSet(ModelViewSet):
    serializer_class = CustomUserModelSerializer
    queryset = CustomUser.objects.all()
