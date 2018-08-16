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
m = Mongo(os.environ.get('MONGODB'), os.environ.get('DB'))
# obj = RedisHelper(os.environ.get('REDIS'))


chan = "nep5"

# create index
def create_index():
    pass
    # m.connection()['block'].create_index([('index', DESCENDING)], unique=True)

    # m.connection()['transaction'].create_index(
    #     [('txid', ASCENDING)], unique=True)
    # m.connection()['transaction'].create_index([('type', ASCENDING)])
    # m.connection()['transaction'].create_index([('blockIndex', ASCENDING)])
    # m.connection()['transaction'].create_index(
    #     [('vin.utxo.address', ASCENDING)])
    # m.connection()['transaction'].create_index(
    #     [('vin.utxo.asset', ASCENDING)])    
    # m.connection()['transaction'].create_index([('vout.address', ASCENDING)])
    # m.connection()['transaction'].create_index([('vout.asset', ASCENDING)])

    # m.connection()['transaction'].create_index([('nep5.to', ASCENDING)])
    # m.connection()['transaction'].create_index([('nep5.from', ASCENDING)])
    # m.connection()['transaction'].create_index([('nep5.assetId', ASCENDING)])

    # m.connection()['address'].create_index(
    #     [('address', DESCENDING)], unique=True)
    # m.connection()['address'].create_index([('blockIndex', ASCENDING)])    

    # m.connection()['asset'].create_index(
    #     [('assetId', DESCENDING)], unique=True)
    # m.connection()['asset'].create_index([('blockIndex', ASCENDING)])    



    # m.connection()['state'].create_index([('index', DESCENDING)])
    # m.connection()['state'].delete_many({})
    # m.connection()['state'].insert_one(
    #     {'_id': ObjectId('5a95047efc2a4961941484e6'), 'height': 0})


def del_all():
    m.connection()['block'].delete_many({})
    m.connection()['transaction'].delete_many({})
    m.connection()['address'].delete_many({})
    m.connection()['asset'].delete_many({})
    m.connection()['state'].delete_many({})


def save_block(start, length):
    print('start', start)
    print('length', length)

    try:
        index = start
        while index <= start + length:
            #print('index', index)
            # 判断 m_block 是否已经存在
            m_block = m.connection()['block'].find_one({
                'Header.Height': index
            })
            # print('m_block', m_block)
            if m_block is None:
                block = b.get_block(index)
                print('block', block)
                m.connection()['block'].insert_one(block)

            m_contract_event = b.get_smart_contract_event_by_height(index)
            # m_block =  m_block or b.get_block(index)
            for tx in m_contract_event:
                print('tx',tx)
                # 判断 m_transaction 是否已经存在
                m_transaction = m.connection()['transaction'].find_one({
                    'TxHash': tx['TxHash']
                })
                if m_transaction is None:
                    save_transaction(tx, index)

                # 保存address
                save_address(tx['Notify'], index)

            index = index + 1
        return True
    except Exception as e:
        logger.error('save_block index %s', index)
        logger.exception(e)
        time.sleep(1)
        save_block(start, length)
        # m.connection()['state'].insert_one({
        #     'index': index,
        #     'error': True
        # })


def save_transaction(tx, blockIndex):
    tx['blockIndex'] = blockIndex
    #print('tx', tx)
    m.connection()['transaction'].insert_one(tx)


def save_address(notifies, blockIndex):

    for notify in notifies:
        print('notify',notify)
        if notify["States"][0] == "transfer":
        # from address
            m_address = m.connection()['address'].find_one({
                'Address': notify["States"][1]
            })
            if m_address is None:
                m.connection()['address'].insert_one({
                    'Address': notify["States"][1],
                    'BlockIndex': blockIndex
                })

            # to address
            m_address = m.connection()['address'].find_one({
                'Address': notify["States"][2]
            })
            if m_address is None:
                m.connection()['address'].insert_one({
                    'Address': notify["States"][2],
                    'BlockIndex': blockIndex
                })
            # 判断 m_assert 是否已经存在
            m_assert = m.connection()['asset'].find_one({
                'ContractAddress': notify["ContractAddress"]
            })
            if m_assert is None:
                save_assert(notify["ContractAddress"],blockIndex)


def save_assert(contractAddress,blockIndex):
    r = {}
    r['ContractAddress'] = contractAddress
    r['blockIndex'] = blockIndex
    m.connection()['asset'].insert_one(r)


def save_state():
    pass

