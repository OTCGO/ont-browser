#!/bin/bash

git reset --hard
git pull origin master:master
npm run build
rm -rf /var/ont-browser/
cp -rf dist/ /var/ont-browser/