from django.contrib import admin
from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
#router.register('post',views.myposts,basename='post')
router.register('user',views.myuser,basename='user')



urlpatterns = [
    path("",include(router.urls)),
    path('signup/',views.sign,name='sign'),
    path('login/',views.login_,name='login'),
    path('logout/',views.logout_,name='logout'),
    path('like/<int:upk>/<int:ppk>/',views.mylike.as_view(),name='like'),
    path('like/',views.mylike.as_view(),name='like'),
    path('post/<int:upk>/',views.myposts.as_view(),name='post'),
    path('post/',views.myposts.as_view(),name='post'),
    path('com/',views.mycomment.as_view(),name='com'),

]
