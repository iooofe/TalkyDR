from django.urls import path
from .views import RegistrationView, LoginView, MeView, EditProfileView

urlpatterns = [
    path('registration/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name = 'login'),
    path("me/", MeView.as_view(), name="me"),
    path("edit/", EditProfileView.as_view(), name = "edit"),
]