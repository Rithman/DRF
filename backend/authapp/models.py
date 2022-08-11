from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    email = models.CharField("email adress", max_length=256, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
