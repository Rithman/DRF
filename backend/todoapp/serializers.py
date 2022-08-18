from rest_framework.serializers import ModelSerializer

from .models import TODO, Project


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "title", "repo_link", "users"]


class TODOSerializer(ModelSerializer):
    class Meta:
        model = TODO
        fields = "__all__"
