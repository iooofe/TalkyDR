from rest_framework import generics
from rest_framework.response import Response
from .serializers import CreatePostSerializer, PostSerializer
from rest_framework.views import APIView
from .models import Post
from accounts.models import User
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView


class CreatePostView(generics.CreateAPIView):
    serializer_class = CreatePostSerializer

class PostPagination(PageNumberPagination):
    page_size = 10 
    page_size_query_param = 'page_size'

class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = PostPagination
    
class UserPostListView(APIView):
    def get(self, request):
        posts = Post.objects.all().filter(author = request.user)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)