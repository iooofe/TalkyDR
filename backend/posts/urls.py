from django.urls import path
from .views import CreatePostView, PostListView, UserPostListView, PostLikeView, PostCommentView

urlpatterns = [
    path('create/', CreatePostView.as_view(), name='CreatePost'),
    path('list/', PostListView.as_view(), name = "ListPost"),
    path('UserList/', UserPostListView.as_view(), name = "UserList"),
    path('<int:post_id>/like/', PostLikeView.as_view(), name='PostLike'),
    path('<post_id>/comment/', PostCommentView.as_view(), name = "CommentCreate")
]