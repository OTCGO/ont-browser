package com.github.ontio;

import com.github.ontio.thread.BlockHandlerThread;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author zhouq
 * @version 1.0
 * @date 2019/4/30
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class BlockHandlerThreadTest {
    @Autowired
    BlockHandlerThread blockHandlerThread;
    @Test
    public void testUpdateDailyInfo() throws  Exception{
        System.out.println("testUpdateDailyInfo");
        blockHandlerThread.batchHandleBlockAndInsertDb(5840657,5840657);
    }
}
