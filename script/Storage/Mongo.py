#! /usr/bin/env python
# coding: utf-8
# Licensed under the MIT License.

from pymongo import MongoClient

class Mongo:
    def __init__(self,url,db):
        print('__init__')
        self.url = url
        self.db = db
        self.connect = MongoClient(self.url,maxPoolSize=1000)[self.db] 
    def connection(self):
        if self.connect is None:
            return MongoClient(self.url,maxPoolSize=1000)[self.db] 
        return self.connect

    
