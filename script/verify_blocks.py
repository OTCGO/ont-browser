#! /usr/bin/env python
# coding: utf-8
# Licensed under the MIT License.

from pymongo import MongoClient, DESCENDING, ASCENDING
from Block.RpcClient import RpcClient
from Storage.Mongo import Mongo
from bson.objectid import ObjectId
import time
import os
from multiprocessing import Pool, cpu_count
from binascii import unhexlify
from utils.tools import Tool
from binascii import unhexlify
# import argparse
from dotenv import load_dotenv, find_dotenv
import logzero
from logzero import logger
from handle import save_block


logzero.logfile(os.getcwd() + "/log/main.log", maxBytes=1e10, backupCount=1)
load_dotenv(find_dotenv(), override=True)

b = RpcClient(os.environ.get('RPC'))
m = Mongo(os.environ.get('MONGODB'), os.environ.get('DB'))
work_count = cpu_count()

def verify_blocks(start):
    try:
        end = b.get_block_count()
        print('end',end)
        m_block = m.connection()['block'].find({'index': {'$gte': 0}},{'index':1}).sort('index',ASCENDING)

        print('m_block',m_block.count())

        point = 0
        for item in m_block:
            print('item.index',item['index'])
            if point != item['index']:
                logger.info('verify_blocks %s',point)
                m_block = save_block(point, 0)
                if m_block is None:
                    save_block(point, 0)

            m.connection()['state'].update_one({'_id':ObjectId('5a95047efc2a4961941484e6')},{
                    '$set':{
                        'height': point
                    }
            })  

            point = point + 1    
        
        print('end')


        # for i in range(0,end,skip):
        #     print('i',i)
        #     print('i + skip - 1',i + skip - 1)
        #     m_count = m.connection()['block'].find({'index': {'$gte': i, '$lte': i + skip - 1}}).count()
        #     print('m_count',m_count)
        #     if m_count != skip:
        #         logger.info('verify_blocks %s',i)





        # end = b.get_block_count()
        # for i in range(start,end):
        #     #print('index',i)
        #     m_block = m.connection()['block'].find_one({'index': i},{'index':1})
        #     if m_block is None:
        #         logger.error('verify_blocks txid %s',i)
        #         #print('save_block',i)
        #         save_block(i, 0)
            
        #     m.connection()['state'].update_one({'_id':ObjectId('5a95047efc2a4961941484e6')},{
        #             '$set':{
        #                 'height': i
        #             }
        #     })    



        

    except Exception as e:
        logger.exception(e)


if __name__ == "__main__":
    try:
        verify_blocks(0)
        # verify_blocks(m.connection()['state'].find_one({'_id':ObjectId('5a95047efc2a4961941484e6')})['height'])
    except Exception as e:
        logger.exception(e)
