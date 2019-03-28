#!/usr/bin/env python3
import os
import sys
import requests
import consul


if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_test_project.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    #c = consul.Consul()
    #ip_addr = requests.request('GET','http://myip.dnsomatic.com')
    #ip_addr = ip_addr.content.decode("utf-8")
    #result = c.agent.service.register('uploadService', address=ip_addr, port=8000)
    execute_from_command_line(sys.argv)
