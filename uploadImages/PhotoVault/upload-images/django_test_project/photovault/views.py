
from django.shortcuts import render
from django.http import HttpResponse
import os, subprocess, json
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from braces.views import CsrfExemptMixin


class Object(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request, format=None):
        return Response({'received data': request.data})
        
@csrf_exempt       
def home(request):
	body = json.loads(request.body)
	url = str(body["endpoint"]["URL"])
	caption = body["endpoint"]["caption"]
	dateUpload = body["endpoint"]["date"]
	location = body["endpoint"]["location"]
	userId = body["endpoint"]["userId"]
	isPublic = body["endpoint"]["isPublic"]
	isPublic = str(isPublic)
	#fileName = body["endpoint"]["fileName"]
	current_dir = os.getcwd()
	directory = current_dir+"/django_test_project/basic.py"
	subprocess.Popen(["python", directory, url, caption, dateUpload, location, userId, isPublic], close_fds=True)
	return render(request, 'photovault/home.html')
