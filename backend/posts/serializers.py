from rest_framework import serializers
from .models import Post
from .models import User

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        
    def validate(self, attrs):
        return attrs
    
    def create(self, validate_data):
        psot = Post.objects.create(
            author = validate_data["author"],
            title = validate_data["title"],
            text = validate_data["text"],
            image = validate_data["image"],
            created_at = validate_data["created_at"],
            is_publish = validate_data["is_publish"]
        )
        

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'