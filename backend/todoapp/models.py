from authapp.models import CustomUser
from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=128)
    repo_link = models.URLField(max_length=256)
    users = models.ManyToManyField(CustomUser)


class TODO(models.Model):
    user = models.ForeignKey(CustomUser, models.PROTECT)
    project = models.ForeignKey(Project, models.PROTECT)
    text = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
