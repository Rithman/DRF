from authapp.models import CustomUser
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APITestCase, force_authenticate

from .models import TODO, Project
from .views import ProjectModelViewSet, TODOModelViewSet


class TestProjectViewSet(TestCase):
    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(
            "/api/projects/",
            {"title": "project_009", "repo_link": "project_009.github.com", "users": [1]},
            format="json",
        )
        view = ProjectModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        client = APIClient()
        admin = CustomUser.objects.create_superuser("admin", "admin@admin.com", "admin123456")
        client.login(username="admin", password="admin123456")
        project = mixer.blend(Project, title="project-12")
        project.users.add(admin.id)
        response = client.patch(f"/api/projects/{project.id}/", {"title": "project-12"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.title, "project-12")
        client.logout()


class TestTODOModelViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get("/api/todos/")
        view = TODOModelViewSet.as_view({"get": "list"})
        admin = CustomUser.objects.create_superuser("admin", "admin@admin.com", "admin123456")
        force_authenticate(request, admin)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class APITestTODOModelViewSetAPITestCase(APITestCase):
    def test_edit_admin(self):
        admin = CustomUser.objects.create_superuser("admin", "admin@admin.com", "admin123456")
        project = mixer.blend(Project)
        project.users.add(admin.id)
        todo = mixer.blend(TODO)
        self.client.login(username="admin", password="admin123456")
        response = self.client.patch(f"/api/todos/{todo.id}/", {"text": "Some new text"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = TODO.objects.get(id=todo.id)
        self.assertEqual(todo.text, "Some new text")
