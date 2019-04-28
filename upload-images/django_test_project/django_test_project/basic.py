#!/usr/bin/env python3
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
location = sys.argv[3]
userId = sys.argv[4]
isPublic = sys.argv[5]
caption = caption.replace("+", " ")
location = location.replace("+", " ")
print("Details:",url,caption, location, userId, isPublic)

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


def insertdb(url, caption, location, userId, isPublic):
    #st = os.stat(fileName)
    #size = (st[6])
    #fileType = fileName.split(".")[-1]
    #name = fileName.split(".")[0]
    #num = random.randint(1, 100000) 
    #fileId = name+str(num)

    dateUpload = datetime.datetime.now()
    if isPublic == "false" or isPublic == "False":
        isPublic = False 
    else:
        isPublic = True 
    thumbnailWidth = "320"
    thumbnailHeight = "174"
    host = settings.DATABASES['default']['HOST']
    try: 
        conn = MongoClient(host) 
        print("Connected successfully!!!") 
    except:   
        print("Could not connect to MongoDB") 
    # database 
    db = conn.photovault
    photoVaultCollections = db.photovault_photomedia
    records = photoVaultCollections.insert_one({"src": url, "caption": caption, "dateUpload": dateUpload, "location": location, "userId": userId, "isPublic": isPublic, "thumbnail": url, "thumbnailWidth": thumbnailWidth, "thumbnailHeight": thumbnailHeight}) 
    print(records)
    return "Record inserted"

#insertdb(url, caption, location, userId, isPublic)
if (insertdb(url, caption, location, userId, isPublic) == "Record inserted"):
   response.status(200)    
    
