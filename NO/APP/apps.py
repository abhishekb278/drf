from django.apps import AppConfig


class AppConfig(AppConfig):
    name = 'APP'

    def ready(self):
        import APP.signals
