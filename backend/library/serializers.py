from rest_framework.serializers import ModelSerializer

from .models import Author, CustomUser


class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        # fields = ['first_name', 'last_name']
        fields = "__all__"


class CustomUserModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "first_name", "last_name", "email"]
