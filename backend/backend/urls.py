from django.contrib import admin
from django.urls import include, path
from library.views import AuthorModelViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("authors", AuthorModelViewSet)

urlpatterns = [path("admin/", admin.site.urls), path("api/", include(router.urls))]
