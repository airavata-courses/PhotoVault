FROM ubuntu:18.04
RUN apt-get upgrade && apt-get update && apt-get install -y nodejs && apt-get install -y npm && apt-get install -y git && apt-get install -y lsof
CMD git clone https://github.com/airavata-courses/PhotoVault.git && cd PhotoVault && git pull && git checkout loginSearch && kill -9 $(lsof -t -i:5000) || echo $?  && npm install && npm start


