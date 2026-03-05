from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import CreatePostSerializer, PostSerializer, PostCommnetCreateSerializer
from rest_framework.views import APIView
from .models import Post, Like 
from accounts.models import User
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


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
    
class PostLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(Post, id = post_id)
        like, created = Like.objects.get_or_create(post = post, user = request.user)
        return Response({"liked": True, "created": created}, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
    
    def delete(self, request, post_id):
        post = get_object_or_404(Post, id = post_id)
        deleted, _ = Like.objects.filter(post=post, user=request.user).delete()
        return Response(
            {"liked": False, "deleted": bool(deleted)}, status=status.HTTP_200_OK)
    
class PostCommentView(APIView): 
    permission_classes = [IsAuthenticated] 
 
    def post(self, request, post_id): 
        
        post = get_object_or_404(Post, id=post_id) 
        
        serializer = PostCommnetCreateSerializer(data=request.data) 
        serializer.is_valid(raise_exception=True) 
        
        comment = serializer.save(post=post, author=request.user)

        return Response(serializer.data, status = status.HTTP_201_CREATED)
    
