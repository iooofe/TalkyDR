from rest_framework import generics
from rest_framework.response import Response
from .serializers import CreatePostSerializer, PostSerializer
from rest_framework.views import APIView
from .models import Post
from accounts.models import User

class CreatePostView(generics.CreateAPIView):
    serializer_class = CreatePostSerializer
    
class PostListView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    
class UserPostListView(APIView):
    def get(self, request):
        posts = Post.objects.all().filter(author = request.user)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)