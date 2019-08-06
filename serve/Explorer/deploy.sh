#!/bin/bash

git reset --hard
git pull origin master:master
mvn clean
mvn package
docker-compose up --build -d


