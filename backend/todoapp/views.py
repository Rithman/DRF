from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter, TODOFilter
from .models import TODO, Project
from .serializers import ProjectSerializer, TODOSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    # pagination_class = ProjectLimitOffsetPagination
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    filterset_class = ProjectFilter


class TODOModelViewSet(ModelViewSet):
    # pagination_class = TODOLimitOffsetPagination
    serializer_class = TODOSerializer
    queryset = TODO.objects.all()
    filterset_class = TODOFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
