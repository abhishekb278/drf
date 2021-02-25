
from django.shortcuts import render,HttpResponse
from django.contrib.auth.models import User

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *
from .models import *
from rest_framework.authtoken.models import Token

from rest_framework.authentication import *
from rest_framework.permissions import *
from rest_framework.decorators import authentication_classes,permission_classes
# Create your views here.

@api_view(['POST'])
def sign(request):
    serializer=Signup_slr(data=request.data)
    data={'Sign_Up':'Something Went Wrong'}
    if serializer.is_valid():
        user=serializer.save()
        token = Token.objects.create(user=user)
        data['Sign_Up'] = 'registration done successfully'
        return Response(data)
    else:
        data=serializer.errors
        return Response(data)

from django.contrib.auth import authenticate, login,logout
@api_view(['POST'])
def login_(request):
    serializer=Login_slr(data=request.data)
    data={'login':'Done'}
    serializer.is_valid()
    if serializer.validated_data is not None and serializer.is_valid():
        user=serializer.validated_data
        login(request, user)
        token,created = Token.objects.get_or_create(user=user)
        data['token'] = str(token)
        data['user_info'] = User.objects.filter(email=user).values('id','username','email')[0]
        return Response(data)
    else:
        data=serializer.errors
        return Response(data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout_(request):
    logout(request)
    data={'logout':'Done'}
    return Response(data)

from rest_framework.views import *

class myposts(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self,request,format=None):
        serializer=Post_slr(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    def get(self,request,upk,format=None):
        queryset=Post.objects.all().order_by('-pid')
        context={'upk':upk}
        serializer=Post_slr(queryset,many=True,context=context)
        return Response(serializer.data)

class myuser(viewsets.ModelViewSet):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=User.objects.all()
    serializer_class=User_slr

class mylike(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self,request,format=None):
        serializer=Like_slr(data=request.data)
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data)
    def delete(self,request,upk,ppk,format=None):
        like=Like.objects.filter(u_id=upk,p_id=ppk)
        like.delete()
        data={}
        data['status']="done"
        return Response(data)

class mycomment(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self,request,format=None):
        serializer=Comment_slr(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        