from django.contrib import admin

# Register your models here.
from .models import Todo
class TodoAdmin(admin.ModelAdmin):
	"""docstring for Todo_admin"""
	list_display=('workname','description','complete')
admin.site.register(Todo,TodoAdmin)
		
