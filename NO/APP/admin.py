from django.contrib import admin
# Register your models here.
from django.apps import apps
from django.contrib.auth import get_user_model
from django.core.signals import setting_changed
from django.dispatch import receiver


from .models import *
admin.site.register(get_user_model())
admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Comments)

