#!/usr/bin/env python3
"""
Django settings for django_test_project project.

Generated by 'django-admin startproject' using Django 2.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import cloudinary
import requests

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '5o7xs#_rneq$%u_9l+vg&$w7@3gn)8zq0(vg8u94^u2ts-iw@@'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

#ALLOWED_HOSTS = ['149.161.168.207','localhost','149.165.156.42','149.165.170.5','uploadService.service.consul']
ALLOWED_HOSTS = ['*']
CSRF_COOKIE_SECURE = False
# Application definition

INSTALLED_APPS = [
    'photovault.apps.PhotovaultConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'cloudinary',
    'corsheaders',
    'rest_framework',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]


ROOT_URLCONF = 'django_test_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# Cloudinary settings for Django. Add to your settings file.
CLOUDINARY = {
  'cloud_name': 'photovault',  
  'api_key': '511629731985125',  
  'api_secret': 'Hz9Vupt0SuSyLVxoev-L7yCAulE',  
}

# Cloudinary settings using environment variables. Add to your .bashrc
CLOUDINARY_CLOUD_NAME='photovault'
CLOUDINARY_API_KEY='511629731985125'
CLOUDINARY_API_SECRET='Hz9Vupt0SuSyLVxoev-L7yCAulE'

# Cloudinary settings using python code. Run before pycloudinary is used.
cloudinary.config(
  cloud_name = 'photovault',  
  api_key = '511629731985125',  
  api_secret = 'Hz9Vupt0SuSyLVxoev-L7yCAulE'  
)

WSGI_APPLICATION = 'django_test_project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases


DATABASES = {
     'default': {
         'ENGINE': 'djongo',
         'NAME': 'photovault',
         'HOST': 'mongodb://dev:dev1PhotoVault@ds161804.mlab.com:61804/photovault',
         'USER': 'dev',
         'PASSWORD': 'dev1PhotoVault',
     }
 }

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'


CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
# CORS_ORIGIN_WHITELIST = (
#     'localhost:3030',
# )
# CORS_ORIGIN_REGEX_WHITELIST = (
#     'localhost:3030',
# )
