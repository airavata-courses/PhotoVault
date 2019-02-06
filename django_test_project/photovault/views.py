
from django.shortcuts import render
from django.http import HttpResponse
import os, subprocess
# Create your views here.

def home(request):
	subprocess.Popen(["python","/Users/uteernakoul/Data/Semester4/Science_Gateway_Architecture/Project/django_test_project/django_test_project/basic.py"], close_fds=True)
	return render(request, 'photovault/home.html')#HttpResponse('<doctype>...')