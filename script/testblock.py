#! /usr/bin/env python
# coding: utf-8
# Licensed under the MIT License.
import logzero
from logzero import logger
import os
from Block.RpcClient import RpcClient
from ontology.ont_sdk import OntologySdk


logzero.logfile(os.getcwd() + "/log/main.log", maxBytes=1e10, backupCount=1)




if __name__ == "__main__":
    try:
        b = RpcClient('http://192.168.31.10:20336')
        print('get_block',b.get_block(172174))
    except Exception as e:
        logger.exception(e)
    
    
