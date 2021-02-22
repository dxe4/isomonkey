from django.urls import path

from .views import LoginView, RegisterView

urlpatterns = [
    path('api/register', RegisterView.as_view()),
    path('api/login', LoginView.as_view()),
]
