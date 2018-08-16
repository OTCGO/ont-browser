#! /usr/bin/env python
# coding: utf-8
# Licensed under the MIT License.

import requests
from logzero import logger
import os

from ontology.ont_sdk import OntologySdk
sdk = OntologySdk()


class RpcClient(object):
    def __init__(self,node_url):
        # self.url = node_url
        sdk.rpc.set_address(node_url)
        print('__init__')

    # 获取主链中区块的数量。
    def get_block_count(self):
        count = sdk.rpc.get_block_count()

        return count

    def get_block(self,height):
        block = sdk.rpc.get_block_by_height(height)

        return block

    ## 获取交易的详情
    def get_smart_contract_event_by_height(self,height):
        event = sdk.rpc.get_smart_contract_event_by_height(height)

        return event

if __name__ == "__main__":
    pass