#!/usr/bin/env python
import os
import sys
import random
import datetime
from pymongo import MongoClient 
from cloudinary.api import delete_resources_by_tag, resources_by_tag
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
import settings
import json

# config
os.chdir(os.path.join(os.path.dirname(sys.argv[0]), '.'))
if os.path.exists('settings.py'):
    exec(open('settings.py').read())

DEFAULT_TAG = "python_sample_basic"

url = sys.argv[1]
caption = sys.argv[2]
dateUpload = sys.argv[3]
location = sys.argv[4]
userId = sys.argv[5]
fileName = sys.argv[6]
print("Details:",url,caption, dateUpload, location, userId, fileName)

def dump_response(response):
    print("Upload response:")
    for key in sorted(response.keys()):
        print("%s: %s" % (key, response[key]))


def upload_files(picture):
    print("--- Upload a local file")
    response = upload(picture, tags=DEFAULT_TAG)
    dump_response(response)
    url, options = cloudinary_url(
        response['public_id'],
        format=response['format']
    )
    url_t, options_t = cloudinary_url(
        response['public_id'],
        format=response['format'],
        width=150,
        height=200,
        crop="fill"
    )
    print("Scaled to 200x150 link: " + url_t)
    print("")
    return url, url_t

#url, url_t = upload_files(fileName)

def insertdb(url, caption, dateUpload, location, userId, fileName):
    #st = os.stat(fileName)
    #size = (st[6])
    #fileType = fileName.split(".")[-1]
    #name = fileName.split(".")[0]
    #num = random.randint(1, 100000) 
    #fileId = name+str(num)
    #dateUpload = datetime.datetime.now()
    host = settings.DATABASES['default']['HOST']
    try: 
        conn = MongoClient(host) 
        print("Connected successfully!!!") 
    except:   
        print("Could not connect to MongoDB") 
  
    # database 
    db = conn.photovault
    photoVaultCollections = db.photovault_photomedia
    records = photoVaultCollections.insert_one({"src": url, "caption": caption, "dateUpload": dateUpload, "location": location, "userId": userId, "fileName": fileName}) 
    print(records)
    # cursor = photoVaultCollections.find() 
    # for record in cursor: 
    #     print("Record:",record) 

insertdb(url, caption, dateUpload, location, userId, fileName)
    
    