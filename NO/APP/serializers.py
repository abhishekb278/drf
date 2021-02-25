from rest_framework import serializers

from .models import *
from django.core.exceptions import ValidationError

from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class Signup_slr(serializers.ModelSerializer):
    password2 = serializers.CharField(required=True,write_only=True,validators=[validate_password])
    class Meta:
        model=User
        fields=('email','username','password','password2')

    def validate(self,values):
        if values['password']!=values['password2']:
            raise serializers.ValidationError('Password did not get matched')
        else:
            pass
        return values

    def create(self,values):
        user=User.objects.create(email=values['email'],username=values['username'])
        user.set_password(values['password'])
        user.save()
        return user


from django.contrib.auth import authenticate
class Login_slr(serializers.ModelSerializer):
    email=serializers.EmailField()
    password=serializers.CharField()
    class Meta:
        model=User
        fields=('email','password')
    
    def validate(self,values):
        user = authenticate(email=values['email'], password=values['password'])
        if user is not None:
            return user
        else:
            raise serializers.ValidationError("Invalid login credentials")
            return None

class User_slr_for_post(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','avatar']


class Like_slr_for_post(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['u_id','like']

class Comment_slr_for_post(serializers.ModelSerializer):
    c_u_id=serializers.SerializerMethodField('find_user')
    class Meta:
        model = Comments
        fields = '__all__'
    
    def find_user(self,obj):
        l=User.objects.get(email=obj.c_u_id)
        return l.username

class Post_slr(serializers.ModelSerializer):
    your_user=User_slr_for_post(many=True,read_only=True)
    like =serializers.SerializerMethodField('all_like')
    counts =serializers.SerializerMethodField('like_count')
    comment =serializers.SerializerMethodField('Comments_')

    class Meta:
        model = Post
        fields =['pid','pdata','File','date','postby','your_user','like','counts','comment']

    def all_like(self,obj):
        u_pk = self.context.get('upk')
        l=Like.objects.filter(u_id=u_pk,p_id=obj.pid)
        serializer = Like_slr_for_post(l,many=True)
        return serializer.data

    def like_count(self,obj):
        l=Like.objects.filter(p_id=obj.pid).count()
        return l
    
    def Comments_(self,obj):
        C=Comments.objects.filter(c_p_id=obj.pid)
        serializer = Comment_slr_for_post(C,many=True)
        return serializer.data



class Like_slr(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class Comment_slr(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'
###################################################################################################
class Slr_for_user(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields =['pid','pdata','File','date']

class User_slr(serializers.ModelSerializer):
    your_posts=Slr_for_user(many=True,read_only=True)
    class Meta:
        model = User
        fields = ['id','username','avatar','your_posts']


