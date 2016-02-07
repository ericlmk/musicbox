
FROM centos:latest

MAINTAINER Eric Lo <ericlmk@gmail.com>


# Install Mongo
RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum -y install mongodb-server; yum clean all
RUN mkdir -p /data/db


# Install Node.js
RUN yum install -y epel-release
# Music Box - Sample Steps - Build Docker Image
# docker build -t ericlmk/musicbox .
# docker run -d -p 3000:3000 --name test ericlmk/musicbox 


RUN yum install -y nodejs npm

# Prepare Application
COPY package.json /src/package.json
#RUN cd /src; npm install
COPY . /src
RUN cd /src; npm install


# Port Setting
EXPOSE 3000


# Commands
WORKDIR /src
RUN chmod 777 ./run.sh
ENTRYPOINT ["./run.sh"]

