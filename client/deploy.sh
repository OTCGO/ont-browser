#!/bin/bash

git reset --hard
git pull origin master:master
npm run build
cp dist/ /var/ont-browser/