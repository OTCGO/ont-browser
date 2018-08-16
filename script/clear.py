#! /usr/bin/env python
# coding: utf-8
# Licensed under the MIT License.


from Block.RpcClient import RpcClient
import time
import os
from multiprocessing import Pool, cpu_count
from binascii import unhexlify
from utils.tools import Tool
from binascii import unhexlify
from dotenv import load_dotenv, find_dotenv
import logzero
from logzero import logger
from handle import save_block,del_all,create_index


logzero.logfile(os.getcwd() + "/log/main.log", maxBytes=1e10, backupCount=1)
load_dotenv(find_dotenv(), override=True)




if __name__ == "__main__":
    try:
        logger.info('clear start')
        del_all()
        create_index()
    except Exception as e:
        logger.exception(e)
