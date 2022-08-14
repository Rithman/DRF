from django_filters import rest_framework as filters

from .models import TODO, Project


class ProjectFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ["title"]


class TODOFilter(filters.FilterSet):
    start_date = filters.DateFilter(field_name="created_at", lookup_expr="gte")
    end_date = filters.DateFilter(field_name="created_at", lookup_expr="lte")

    class Meta:
        model = TODO
        fields = ["start_date", "end_date", "project__id"]
