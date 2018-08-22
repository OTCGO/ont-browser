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
# import argparse
from dotenv import load_dotenv, find_dotenv
import logzero
from logzero import logger
from apscheduler.schedulers.blocking import BlockingScheduler
from datetime import datetime

from handle import save_block


logzero.logfile(os.getcwd() + "/log/main.log", maxBytes=1e10, backupCount=1)
load_dotenv(find_dotenv(), override=True)

b = RpcClient(os.environ.get('RPC'))
m = Mongo(os.environ.get('MONGODB'), os.environ.get('DB'))
work_count = cpu_count()


def async_current():
    try:
        r = b.get_block_count()
        m_block = m.connection()['block'].find_one(
            {}, sort=[('Header.Height', DESCENDING)]) or {'Header': {'Height': -1}}
        print('r', r)
        print(' m_block',  m_block['Header']['Height'])
        save_block(m_block['Header']['Height'] + 1, r - 2 -  m_block['Header']['Height'])

    except Exception as e:
        logger.exception(e)


def job():
    print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))


if __name__ == "__main__":
    try:
        async_current()
        sched = BlockingScheduler()
        sched.add_job(async_current, 'interval', seconds=5)
        sched.start()
    except Exception as e:
        logger.exception(e)
        time.sleep(5)
        sched.start()
