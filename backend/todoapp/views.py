from rest_framework.viewsets import ModelViewSet

from .models import TODO, Project
from .serializers import ProjectSerializer, TODOSerializer


class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class TODOModelViewSet(ModelViewSet):
    serializer_class = TODOSerializer
    queryset = TODO.objects.all()
