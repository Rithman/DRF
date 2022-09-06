from graphene import ID, Field, Int, List, Mutation, ObjectType, Schema, String
from graphene_django import DjangoObjectType
from todoapp.models import TODO, Project


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class TODOMutation(Mutation):
    class Arguments:
        text = String(required=True)
        id = ID()

    todo = Field(TODOType)

    @classmethod
    def mutate(cls, root, info, text, id):
        todo = TODO.objects.get(pk=id)
        todo.text = text
        todo.save()
        return TODOMutation(todo=todo)


class Mutation(ObjectType):
    update_todo = TODOMutation.Field()


class Query(ObjectType):
    all_todos = List(TODOType)
    todo_by_id = Field(TODOType, id=Int(required=True))
    todo_by_project_title = List(TODOType, title=String(required=False))
    all_projects = List(ProjectType)

    def resolve_all_todos(root, info):
        return TODO.objects.all()

    def resolve_todo_by_id(seld, info, id):
        try:
            return TODO.objects.get(id=id)
        except TODO.DoesNotExist:
            return None

    def resolve_todo_by_project_title(self, info, title=None):
        todos = TODO.objects.all()
        if title:
            todos = todos.filter(project__title=title)
        return todos

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = Schema(query=Query, mutation=Mutation)
