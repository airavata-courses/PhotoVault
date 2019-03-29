FROM python:3.6

# Create app directory
WORKDIR /

# Copy contents
COPY . .

# Install dependencies
RUN pwd
#RUN pip3 install  --upgrade --trusted-host pypi.python.org -r requirements.txt
RUN pip install -r requirements.txt
#RUN pip install .

# Port to open in Docker
EXPOSE 8000

# command to run at container startup
CMD ./starter.sh

