#!/bin/bash

git reset --hard
git pull origin master:master
npm i
npm run build
docker-compose up -d --build