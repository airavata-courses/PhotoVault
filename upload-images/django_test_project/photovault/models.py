from django.db import models
from django.utils import timezone

# Create your models here.
class PhotoMedia(models.Model):
	userId = models.CharField(default = "null", max_length=100)
	userEmail = models.EmailField(default = "null"	)
	fileName = models.TextField()
	downloadLink = models.TextField()
	filePath= models.TextField(default = "null")
	accessRights = models.TextField(default = "private")
	caption = models.TextField(default = "null")
	hashtag = models.TextField(default = "null")
	size = models.TextField()
	dateUpload = models.DateTimeField(default = timezone.now)
	location = models.TextField(default = "null")
	fileType = models.TextField(default = "null")
	thumbnail = models.TextField(default = "null")
	thumbnailwidth = models.TextField(default = "null")
	thumbnailHeight = models.TextField(default = "null")
	isPublic = models.TextField(default = "null")
