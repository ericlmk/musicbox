# Music Box
This is a demo application with using Node.js and MongoDB in one Docker container. Some RESTful services are provided.

## Getting started

### Table of contents

* [Requirement](#requirement)
* [Installation](#installation)
* [RESTful Interface](#restful-interface)
    * [1. CRUD for Artist](#1-crud-for-artist)
    * [2. Search for Artist](#2-search-for-artist)
* [IBM Bluemix](#ibm-bluemix)
* [Technical Detail](#technical-detail)

==================================================

### Requirement
* [Docker](http://www.docker.com)
* [Node.js](http://nodejs.org)
* [MongoDB](http://mongodb.org)

==================================================

### Installation

To download source code from GitHub, run:

    git clone https://github.com/ericlmk/musicbox.git

To build the Docker image, run:

    docker build -t ericlmk/musicbox .

To run the Docker image, run:

    docker run -d -p 3000:3000 --name musicbox ericlmk/musicbox

And then, visit [http://192.168.99.100:3000/](http://192.168.99.100:3000/)

==================================================

### RESTful Interface

#### 1. CRUD for Artist

**URL:**

    http://192.168.99.100:3000/service/artists/<ID>
    http://192.168.99.100:3000/service/artists/1

| CRUD    | HTTP Operation  |
| ------- | --------------- |
| Create  | POST            |
| Read    | GET             |
| Update  | PUT             |
| Delete  | DELETE          |

**Sample Data for POST/PUT (x-www-form-urlencoded):**

| Field Name    | Value                                                |
| ------------- | ---------------------------------------------------- |
| name          | Kelly Chen                                           |
| street        | N/A                                                  |
| pobox         | P.O. Box 98820 Tsim Sha Tsui Post Office, Hong Kong  |
| city          | Hong Kong                                            |
| stateProvince | N/A                                                  |
| country       | Hong Kong                                            |
| zip           | 852                                                  |
| email         | kcifc@biznetvigator.com                              |
| instruments   | Piano                                                |

**Sample Result for GET:**

    {
      "result": {
        "_id": 1,
        "name": "Kelly Chen",
        "street": "N/A",
        "pobox": "P.O. Box 98820 Tsim Sha Tsui Post Office, Hong Kong",
        "city": "Hong Kong",
        "stateProvince": "N/A",
        "country": "China",
        "zip": "852",
        "email": "kcifc@biznetvigator.com",
        "instruments": "Piano",
        "__v": 0
      }
    }

#### 2. Search for Artist

**URL:**

    http://192.168.99.100:3000/service/artists/search/<FIELD>/<VALUE>
    http://192.168.99.100:3000/service/artists/search/name/kelly

==================================================

### IBM Bluemix

The docker image can be deployed and run on IBM Bluemix platform.

Prerequisite: You have already installed Docker in your local machine

Install Cloud Foundry CLI and IBM Containers plug-in
```
https://www.ng.bluemix.net/docs/containers/container_cli_cfic.html
```

To log in to IBM Bluemix (US South), run:

```
cf login -a api.ng.bluemix.net
```

To set container namespace (Set ONCE only), run:

*Remark: The namespace can't be changed later*

```
cf ic namespace set <NAMESPACE_NAME>
```

To log in to IBM Containers service, run:
```
cf ic login
```

To set Docker local environment (for Windows), run:

*Remark: Your own script will be displayed in command prompt after log in to IBM Containers service*

```
(Sample Only)
set DOCKER_HOST=tcp://containers-api.ng.bluemix.net:8443
set DOCKER_CERT_PATH=C:\Users\ericlmk\.ice\certs\containers-api.ng.bluemix.net\xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
set DOCKER_TLS_VERIFY=1
```

To build the Docker image, run:
```
docker build -t musicbox .
```

To push your Docker image to IBM Bluemix registry, run:
```
docker push registry.ng.bluemix.net/<NAMESPACE_NAME>/musicbox
```

To run the Docker image, run:
```
cf ic run --name musicbox registry.ng.bluemix.net/<NAMESPACE_NAME>/musicbox
```

To request an external IP, run:
```
cf ic ip request
```

To bind the external IP to your docker runtime, run:
```
cf ic ip bind <EXTERNAL_IP> musicbox
```

And then, visit http://< EXTERNAL_IP >:3000/

==================================================

### Technical Detail

To be provided
