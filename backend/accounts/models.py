from django.contrib.auth.models import AbstractUser
from django.db import models 


class User(AbstractUser):
    birth_date = models.DateField(null = True, blank = True)
    name = models.CharField(max_length = 32, null = True)
    age = models.IntegerField(default = 0)
    discription = models.CharField(max_length = 90, default = None, null = True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    
