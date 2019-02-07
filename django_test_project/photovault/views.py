
from django.shortcuts import render
from django.http import HttpResponse
import os, subprocess, json
# Create your views here.

def home(request):
	print("body:", request.body)
	body = json.loads(request.body)
	print(body)
	url = str(body["url"])
	caption = body["caption"]
	dateUpload = body["date"]
	location = body["location"]
	userId = body["userId"]
	fileName = body["fileName"]
	current_dir = os.getcwd()
	subprocess.Popen(["python",current_dir+"/django_test_project/basic.py", url, caption, dateUpload, location, userId, fileName], close_fds=True)
	return render(request, 'photovault/home.html')
