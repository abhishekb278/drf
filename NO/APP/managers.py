from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _



class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password,**extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password,**extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        if password is None:
            raise TypeError('password is must')
        if email is None:
            raise TypeError('Email is must')
        '''if username is None:
            username='None'
            print('HERE')'''
        
        user = self.create_user(email,password)
        user.is_superuser=True
        user.is_staff=True
        user.save()
        return user
