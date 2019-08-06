#!/bin/bash

git reset --hard
git pull origin master:master
mvn clean
mvn package -Dmaven.test.skip=true
docker-compose up --build -d


