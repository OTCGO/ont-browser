#!/bin/bash

git reset --hard
git pull origin master:master
rm -rf target/
mvn clean
mvn package -Dmaven.test.skip=true
docker-compose up --build -d


