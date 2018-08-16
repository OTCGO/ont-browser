# #! /usr/bin/env python
# # coding: utf-8
# # Licensed under the MIT License.

# import os,sys 
# parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) 
# sys.path.insert(0,parentdir) 
# import unittest
# from Block.RpcClient import RpcClient
 
# b = RpcClient('http://192.168.31.9:20332')

# class TestBlock(unittest.TestCase):

#     def test_get_block_count(self):
#         self.assertIsNotNone(b.get_block_count())

#     def test_get_block(self):
#         index = b.get_block(1186737)['index']
#         print(index)
#         self.assertAlmostEqual(index,1186737)

#     def test_get_asset_state(self):
#         assert_id = '0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b'
#         r = b.get_asset_state(assert_id)
#         print('test_get_asset_state',r)
#         self.assertAlmostEqual(r['id'],assert_id)

#     def test_get_application_log(self):
#         txid = '0x9db4725a8b6a43ce91d5085fe88df59578993d7cd0b2397934215463c48d575f'
#         r = b.get_application_log(txid)
#         print('test_get_application_log',r)
#         self.assertAlmostEqual(r['txid'],txid)

# if __name__ == '__main__':
#     unittest.main()