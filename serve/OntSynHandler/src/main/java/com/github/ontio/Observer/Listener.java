package com.github.ontio.Observer;

import com.github.ontio.ApplicationContextProvider;
import com.github.ontio.thread.BlockHandlerThread;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Observable;
import java.util.Observer;

public class Listener implements Observer {
    @Autowired
    private ApplicationContextProvider applicationContextProvider;

    @Override
    public void update(Observable o, Object arg) {
        // System.out.println("RunThread死机");
        // lockHandlerThread run = new BlockHandlerThread();

        BlockHandlerThread run = applicationContextProvider.getBean("BlockHandlerThread", BlockHandlerThread.class);

        run.addObserver(this);
        new Thread(run).start();
        // System.out.println("RunThread重启");

    }
}
