
# #! /usr/bin/env python
# # coding: utf-8
# # Licensed under the MIT License.

# import os,sys 
# parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) 
# sys.path.insert(0,parentdir) 
# import unittest
# from Storage.Mongo import Mongo

# m = Mongo()
# class TestBlock(unittest.TestCase):
    
#     def test_connection(self): 
#         self.assertIsNotNone(m.connection()['block'])
#     def test_insert_one(self):
#         self.assertIsNotNone(m.connection()['block'].insert_one({'te':'aa'}))
 
   
# if __name__ == '__main__':
#     try:
#         unittest.main()
#     except Exception as e:
#         print(e)
    