from authapp import models
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


@admin.register(models.CustomUser)
class CustomUserModelAdmin(UserAdmin):
    list_display = ["id", "username", "email", "is_active", "date_joined"]
    ordering = ["-date_joined"]
