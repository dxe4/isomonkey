from django.db import models

from django.db import models
from django.db.models import Max
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField('email address', unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Pictures(models.Model):
    # TODO, s3 or equivilent
    image = models.ImageField()
    exif_data = models.JSONField(blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    order = models.IntegerField(unique=True)

    def save(self, *args, **kwargs):
        if not self.pk and not self.order:
            _result = Pictures.objects.filter(
                user=self.user.id
            ).aggregate(max_order=Max('order'))
            if _result['max_order'] is None:
                self.order = 1
            else:
                self.order = _result['max_order'] + 1

        return super(Pictures, self).save(*args, **kwargs)
