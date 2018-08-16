
# #! /usr/bin/env python
# # coding: utf-8
# # Licensed under the MIT License.

# import os,sys 
# parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) 
# sys.path.insert(0,parentdir) 
# import unittest
# from main import save_transaction,handle_nep5,del_all,save_block

# # del_all()
# class TestMain(unittest.TestCase):
#     '''
#     def test_save_transaction(self): 
#         tx = {
#                 "txid": "0x036c689ab6b72313460fdcc5faf145697de07d0d39578da9d22446f56a41cce5",
#                 "size": 202,
#                 "type": "ContractTransaction",
#                 "version": 0,
#                 "attributes": [],
#                 "vin": [
#                     {
#                         "txid": "0x27392000a42b86f8ce3a3e67c254c91eea500b56e8cb5daf876b2d23273386a3",
#                         "vout": 0
#                     }
#                 ],
#                 "vout": [
#                     {
#                         "n": 0,
#                         "asset": "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b",
#                         "value": "10",
#                         "address": "AJb2cttsRbGBnv3EHLey2PcfWsp25e3CVw"
#                     }
#                 ],
#                 "sys_fee": "0",
#                 "net_fee": "0",
#                 "scripts": [
#                     {
#                         "invocation": "405212676f8d6825e9d1d16b9a2313d0f9f8ab504d897bcfc2c42ad8cf11573d7d6192080912189e33084dabf8b1ae8a8e1229efb82800457bbad9d15362a6734d",
#                         "verification": "21031de2e1ed755b508617c70a56ed20f971ba015c449bb7513afbc67e1370bfaccbac"
#                     }
#                 ]
#             }
#         # save_transaction(tx,10000)
#     '''
    
#     def test_handle_nep5(self):
#         # txid = '0x9db4725a8b6a43ce91d5085fe88df59578993d7cd0b2397934215463c48d575f'
#         txid = '0xa155ba865c7b86b1c84fe891f52ca41787eeefb55d471c5fad9eedc0d9dac0bb'
#         r = handle_nep5(txid,1000)
#         print('r',r)
#         self.assertIsNotNone(r)
    
#     '''
#     def test_save_block(self): 
#         # 1115000
#         # 944447
#         # 720300
#        r = save_block(720300,0)
#        print('r',r)
#        self.assertIsNotNone(r)
#     '''
# if __name__ == '__main__':
#     try:
#         unittest.main()
#     except Exception as e:
#         print(e)
    