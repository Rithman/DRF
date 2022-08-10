from authapp.serializers import CustomUserModelSerializer
from rest_framework.serializers import ModelSerializer, StringRelatedField

from .models import TODO, Project


class ProjectSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ["title", "repo_link", "users"]


class TODOSerializer(ModelSerializer):
    project = ProjectSerializer()
    user = CustomUserModelSerializer()

    class Meta:
        model = TODO
        exclude = ["id"]
