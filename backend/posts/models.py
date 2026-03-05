from django.db import models
from accounts.models import User

class Post(models.Model):
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length = 64)
    text = models.TextField(max_length = 2000)
    image = models.ImageField(upload_to = "posts/", blank = True, null = True)
    created_at = models.DateTimeField(auto_now_add = True)
    is_publish = models.BooleanField(default = True)

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "post"], name="unique_user_post_like")
        ]

class DisLike(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "post"], name="unique_user_post_dislike")
        ]

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete = models.CASCADE, related_name="comments")
    text = models.TextField(max_length = 1000)
    created_at = models.DateTimeField(auto_now_add = True)

    class Meta:
        ordering = ["-created_at"]

