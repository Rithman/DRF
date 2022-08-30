from authapp.views import CurrentCustomUserView, CustomUserModelLimitedViewSet, CustomUserModelViewSet
from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from todoapp.views import ProjectModelViewSet, TODOModelViewSet

router = DefaultRouter()
router.register("users", CustomUserModelViewSet, basename="users")
router.register("projects", ProjectModelViewSet)
router.register("todos", TODOModelViewSet)
router.register("limited_users", CustomUserModelLimitedViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api-auth/", include("rest_framework.urls")),
    path("api-token-auth/", views.obtain_auth_token),
    path("api-current-user/", CurrentCustomUserView.as_view()),
]
