FROM ubuntu:18.04
RUN apt-get upgrade && apt-get update && apt-get install -y nodejs && apt-get install -y npm && apt-get install -y git
CMD git clone https://github.com/airavata-courses/PhotoVault.git &&  cd PhotoVault && git pull && git checkout website && npm install && npm start
CMD exec /bin/bash -c "trap : TERM INT; sleep infinity & wait"
