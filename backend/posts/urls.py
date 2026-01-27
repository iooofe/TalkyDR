from django.urls import path
from .views import CreatePostView, PostListView, UserPostListView

urlpatterns = [
    path('create/', CreatePostView.as_view(), name='CreatePost'),
    path('list/', PostListView.as_view(), name = "ListPost"),
    path('UserList/', UserPostListView.as_view(), name = "UserList"),
]