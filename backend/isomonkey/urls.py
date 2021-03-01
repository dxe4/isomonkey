from django.urls import path

from .views import LoginView, RegisterView, FileView

urlpatterns = [
    path('api/register', RegisterView.as_view()),
    path('api/login', LoginView.as_view()),
    path('api/files', FileView.as_view()),
]
