from isomonkey.models import Pictures
from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

class HTTPMethodRequiredFieldsMixin:
    '''
    To avoid creating separate serializers for separate methods
    '''

    PER_ACTION_REQUIRED_FIELDS = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request:
            http_method = request.method
            required_fields = (self.PER_ACTION_REQUIRED_FIELDS or {}).get(http_method)
            if required_fields:
                for field_name, required_value in required_fields:
                    self.fields[field_name].required = required_value


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('password', 'first_name', 'last_name', 'email')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            **validated_data
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(max_length=1024, required=True)


class FileSerializer(serializers.ModelSerializer):
    order = serializers.IntegerField(required=False)

    class Meta:
        model = Pictures
        fields = ['image', 'exif_data', 'user', 'order', 'pk']


class FileUpdateSerializer(serializers.ModelSerializer):
    order = serializers.IntegerField(required=False)

    class Meta:
        model = Pictures
        fields = ['exif_data', 'user', 'order', 'pk']
