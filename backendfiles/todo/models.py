from django.db import models

# Create your models here.
class Todo(models.Model):
	workname=models.CharField(max_length=50)
	description=models.TextField()
	complete=models.BooleanField(default=False)

	def _str_(self):
		return self.workname