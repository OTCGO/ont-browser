'''订阅方'''

from  utils.redisHelper import RedisHelper

obj = RedisHelper()
redis_sub = obj.subscribe('nep5')

while True:
    msg = redis_sub.parse_response()
    print('接收：',msg)