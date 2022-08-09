from authapp.views import CustomUserModelViewSet
from django.contrib import admin
from django.urls import include, path
from library.views import AuthorModelViewSet
from rest_framework.routers import DefaultRouter
from todoapp.views import ProjectModelViewSet, TODOModelViewSet

router = DefaultRouter()
router.register("authors", AuthorModelViewSet)
router.register("users", CustomUserModelViewSet)
router.register("projects", ProjectModelViewSet)
router.register("todos", TODOModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
