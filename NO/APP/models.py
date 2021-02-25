from __future__ import unicode_literals

from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

from .managers import UserManager

from django.db import models
from django.conf import settings

class Post(models.Model):
    pid=models.AutoField(primary_key=True)
    postby= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='your_posts')
    File=models.FileField(upload_to ='post/') 
    pdata=models.CharField(max_length=500,default=" ")
    date=models.DateField(auto_now_add=True)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(_('username'),unique=True,max_length=200)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('active'), default=False)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    userby= models.ManyToManyField(Post,related_name='your_user')




    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def tokens(self):
        print('token')
        return ''

class Like(models.Model):
    l_id=models.AutoField(primary_key=True)
    p_id=models.ForeignKey(Post, on_delete=models.CASCADE,related_name='like')
    u_id=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='like')
    like=models.BooleanField(default=True)

class Comments(models.Model):
    c_id=models.AutoField(primary_key=True)
    c_p_id=models.ForeignKey(Post, on_delete=models.CASCADE,related_name='comments')
    c_u_id=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='comments')
    Comments=models.CharField(max_length=200)