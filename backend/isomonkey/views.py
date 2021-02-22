from rest_framework import generics
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings

from isomonkey.models import CustomUser
from isomonkey.serializers import LoginSerializer, RegisterSerializer


def _jwt_login(user):
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)

    return {
        'payload': payload,
        'token': token
    }


class RegisterView(generics.GenericAPIView):
    permission_classes = []
    serializer_class = RegisterSerializer

    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        data = _jwt_login(user)

        return Response(data, status=200)


class LoginView(generics.GenericAPIView):
    permission_classes = []
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({}, status=403)
        else:
            if user.check_password(password):
                data = _jwt_login(user)
                return Response(data, status=200)
            else:
                return Response({}, status=403)
