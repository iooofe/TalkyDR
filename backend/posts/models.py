from django.db import models
from accounts.models import User

class Post(models.Model):
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length = 64)
    text = models.TextField(max_length = 2000)
    image = models.ImageField(upload_to = "posts/", blank = True, null = True)
    created_at = models.DateTimeField(auto_now_add = True)
    is_publish = models.BooleanField(default = True)