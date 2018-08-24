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

# from  utils.redisHelper import RedisHelper
from ontology.ont_sdk import OntologySdk


load_dotenv(find_dotenv(), override=True)

print('RPC', os.environ.get('RPC'))
print('MONGODB', os.environ.get('MONGODB'))
print('DB', os.environ.get('DB'))
print('WORK_COUNT', cpu_count())
b = RpcClient(os.environ.get('RPC'))

# obj = RedisHelper(os.environ.get('REDIS'))


m = Mongo(os.environ.get('MONGODB'), os.environ.get('DB'))

# chan = "nep5"

# create index
def create_index():
    m.connection()['block'].create_index([('Hash', DESCENDING)], unique=True)
    m.connection()['block'].create_index([('Header.Height', DESCENDING)], unique=True)
    m.connection()['block'].create_index([('Header.Hash', DESCENDING)], unique=True)

    m.connection()['transaction'].create_index(
        [('TxHash', DESCENDING)], unique=True)
    m.connection()['transaction'].create_index(
        [('Height', DESCENDING)], unique=True)

    m.connection()['transaction'].create_index(
        [('Notify.States', DESCENDING)])

    m.connection()['address'].create_index(
        [('Address', DESCENDING)], unique=True)
    m.connection()['address'].create_index([('Height', ASCENDING)])    

    m.connection()['asset'].create_index(
        [('ContractAddress', DESCENDING)], unique=True)
    m.connection()['asset'].create_index([('Height', ASCENDING)])    



    m.connection()['state'].create_index([('index', DESCENDING)])
    m.connection()['state'].delete_many({})
    m.connection()['state'].insert_one(
        {'_id': ObjectId('5a95047efc2a4961941484e6'), 'height': 0})


def del_all():
    m.connection()['block'].delete_many({})
    m.connection()['transaction'].delete_many({})
    m.connection()['address'].delete_many({})
    m.connection()['asset'].delete_many({})
    m.connection()['state'].delete_many({})


def save_block(start, length):
    print('start', start)
    print('length', length)

    # m = Mongo(os.environ.get('MONGODB'), os.environ.get('DB'))
    try:
        index = start
        while index <= start + length:
            #print('index', index)
            # 判断 m_block 是否已经存在
            m_block = m.connection()['block'].find_one({
                'Header.Height': index
            })
            #print('m_block', m_block)
            if m_block is None:
                m_block = b.get_block(index) 
                print('m_block', m_block)  
                m_block['Header']['ConsensusData'] = str(m_block['Header']['ConsensusData'])          
                m.connection()['block'].insert_one(m_block)

            m_contract_event = b.get_smart_contract_event_by_height(index) or []
            # print('m_contract_event',m_contract_event)
            # m_block =  m_block or b.get_block(index)
            for tx in m_contract_event:
                # print('tx',tx)

                # State = 0 失败
                if tx['State'] == 0:
                    continue

                # 判断 m_transaction 是否已经存在
                m_transaction = m.connection()['transaction'].find_one({
                    'TxHash': tx['TxHash']
                })
                if m_transaction is None:
                    save_transaction(tx, index,m_block['Header']['Timestamp'])

                # 保存address
                save_address(tx['Notify'], index)

            index = index + 1
        return True
    except Exception as e:
        logger.error('save_block index %s', index)
        logger.exception(e)
        time.sleep(1)
        save_block(start, length)


def save_transaction(tx, blockIndex,timestamp):
    tx['Height'] = blockIndex
    tx['Timestamp'] = timestamp
    #print('tx', tx)
    m.connection()['transaction'].insert_one(tx)


def save_address(notifies, height):

    for notify in notifies:
        # print('notify',notify)
        if notify["States"][0] == "transfer":
            # from address
            f_address = m.connection()['address'].find_one({
                'Address': notify["States"][1]
            })
            if f_address is None:
                m.connection()['address'].insert_one({
                    'Address': notify["States"][1],
                    'Height': height
                })
            
            # to address
            # print('t_address',notify["States"][2])
            t_address = m.connection()['address'].find_one({
                'Address': notify["States"][2]
            })
            # print('t_address',t_address)
            if t_address is None:
                m.connection()['address'].insert_one({
                    'Address': notify["States"][2],
                    'Height': height
                })


            # 判断 m_assert 是否已经存在
            m_assert = m.connection()['asset'].find_one({
                'ContractAddress': notify["ContractAddress"]
            })
            if m_assert is None:
                save_assert(notify["ContractAddress"],height)


def save_assert(contractAddress,height):
    r = {}
    r['ContractAddress'] = contractAddress
    r['Height'] = height
    m.connection()['asset'].insert_one(r)


def save_state():
    pass

