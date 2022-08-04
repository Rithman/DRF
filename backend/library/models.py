from django.contrib.auth.models import AbstractUser
from django.db import models


class Author(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField()


class CustomUser(AbstractUser):
    email = models.CharField("email adress", max_length=256, unique=True)
