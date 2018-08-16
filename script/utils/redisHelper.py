import redis

class RedisHelper:
    def __init__(self,host):
        self.__conn = redis.Redis(host=host)


#发送消息
    def public(self,chan,msg):
        self.__conn.publish(chan,msg)
        return True
#订阅
    def subscribe(self,chan):
        #打开收音机
        pub = self.__conn.pubsub()
        #调频道
        pub.subscribe(chan)
        #准备接收
        pub.parse_response()
        return pub