from django.dispatch import receiver
from .models import *
from django.db.models.signals import *
@receiver(post_save,sender=Post)
def Post_User(sender,instance,created,**kwargs):
    if created:
        print("-------------------------------------")
        print(sender,instance.postby,created)
        print(f'kwargs:{kwargs}')
        u1=User.objects.filter(email=str(instance.postby))
        uid=0
        for i in u1:
            uid=int(i.id)
        u1=User.objects.get(id=uid)
        p=Post.objects.get(pid=(instance.pid))
        u1.userby.add(p)
    else:
        print("PRINT")