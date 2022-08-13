from authapp.views import CustomUserModelLimitedViewSet, CustomUserModelViewSet
from django.contrib import admin
from django.urls import include, path
from library.views import AuthorModelViewSet
from rest_framework.routers import DefaultRouter
from todoapp.views import ProjectModelViewSet, TODOModelViewSet

router = DefaultRouter()
router.register("authors", AuthorModelViewSet)
router.register("users", CustomUserModelViewSet, basename="users")
router.register("projects", ProjectModelViewSet)
router.register("todos", TODOModelViewSet)
router.register("limited_users", CustomUserModelLimitedViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
