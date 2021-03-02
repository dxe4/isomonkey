from django.utils import translation
from django.db import transaction
from django.db.models import F, query
from django.db.models.functions import Abs

from rest_framework import generics, mixins
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings

from isomonkey.models import CustomUser, Pictures
from isomonkey.serializers import LoginSerializer, RegisterSerializer, FileSerializer, FileUpdateSerializer


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


class FileView(generics.GenericAPIView, mixins.CreateModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin):

    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return FileUpdateSerializer
        else:
            return FileSerializer
    
    def get_queryset(self):
        return Pictures.objects.filter(user=self.request.user).order_by('order')

    def post(self, request, *args, **kwargs):
        request.data.update({"user": request.user.id})
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)

        queryset = self.filter_queryset(self.get_queryset()).filter(pk__in=[i['pk'] for i in request.data])
        data_by_pk = {i['pk']: i for i in request.data}

        with transaction.atomic():
            # order is unique so when we swap the constraint will fail
            # for now this should do, rethink later
            queryset.update(order=F('order') * -1)
            for picture in queryset:
                serializer = self.get_serializer(picture, data=data_by_pk[picture.id], partial=partial)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)

            queryset.update(order=Abs('order'))


        return Response(FileSerializer(queryset, many=True).data)
