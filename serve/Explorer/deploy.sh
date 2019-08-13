#!/bin/bash

git reset --hard
git pull origin master:master
mvn clean
rm -rf target/
mvn package -Dmaven.test.skip=true
docker-compose up --build -d


