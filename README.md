# Music Box
This is a demo application with using Node.js and MongoDB in one Docker container. Some RESTful services are provided.



## Getting started

### Table of contents

* [Requirement](#requirement)
* [Installation](#installation)
* [RESTful Interface](#restful-interface)
    * [1. CRUD for Artist](#1-crud-for-artist)
    * [2. Search for Artist](#2-search-for-artist)
* [Technical Detail](#technical-detail)

### Requirement
* [Docker](http://www.docker.com)
* [NodeJs](http://nodejs.org)
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
| street        | centered                                             |
| pobox         |  P.O. Box 98820 Tsim Sha Tsui Post Office, Hong Kong |
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

### Technical Detail

To be provided
