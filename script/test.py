#! /usr/bin/env python
# coding: utf-8
# Licensed under the MIT License.
import logzero
from logzero import logger
import os

from handle import save_block
from ontology.ont_sdk import OntologySdk


logzero.logfile(os.getcwd() + "/log/main.log", maxBytes=1e10, backupCount=1)


def verify_blocks(height):
    try:
        save_block(height,0)

    except Exception as e:
        logger.exception(e)


if __name__ == "__main__":
    try:
        print('start')
        verify_blocks(173732)
    except Exception as e:
        logger.exception(e)
