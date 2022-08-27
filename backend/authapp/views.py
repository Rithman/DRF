from django.shortcuts import get_object_or_404
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserModelViewSet(ModelViewSet):
    permission_classes = [DjangoModelPermissions]
    serializer_class = CustomUserModelSerializer
    queryset = CustomUser.objects.all()


class CustomUserModelLimitedViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet
):

    serializer_class = CustomUserModelSerializer
    queryset = CustomUser.objects.all()
    filterset_fields = ["first_name", "last_name"]  # Just for training

    @action(detail=True, methods=["get"])  # Just for training
    def get_user_name(self, request, pk):
        user = get_object_or_404(CustomUser, pk=pk)
        return Response({"name": str(user.first_name)})


class CurrentCustomUserView(APIView):
    def get(self, request):
        serializer = CustomUserModelSerializer(request.user)
        return Response(serializer.data)
