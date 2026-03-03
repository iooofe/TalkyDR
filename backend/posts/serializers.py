from rest_framework import serializers
from .models import Post, Like, Comment
from .models import User

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ('created_at',)

    def create(self, validated_data):
        post = Post.objects.create(
            author=validated_data["author"],
            title=validated_data["title"],
            text=validated_data["text"],
            image=validated_data.get("image"),
            is_publish=validated_data.get("is_publish", True),
        )
        return post

        

class PostSerializer(serializers.ModelSerializer):
    comments_count = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    author_username = serializers.CharField(source='author.username', read_only=True)
    author_name = serializers.CharField(source='author.name', read_only=True)
    author_avatar = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id",
            "author",
            "author_username",
            "author_name",
            "author_avatar",
            "title",
            "text",
            "image",
            "created_at",
            "is_publish",
            "likes_count",
            "is_liked",
            "comments_count"
        )

    def get_likes_count(self, obj):
        return Like.objects.filter(post=obj).count()

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False
        return Like.objects.filter(post=obj, user=request.user).exists()

    def get_author_avatar(self, obj):
        request = self.context.get("request")
        if obj.author.avatar and hasattr(obj.author.avatar, "url"):
            url = obj.author.avatar.url
            return request.build_absolute_uri(url) if request else url
        return None
    
    def get_comments_count(self, obj):
        return Comment.objects.filter(post = obj).count()

class PostCommnetCreateSerializer(serializers.ModelSerializer):
    class meta:
        model = Comment
        fields = "__all__"
