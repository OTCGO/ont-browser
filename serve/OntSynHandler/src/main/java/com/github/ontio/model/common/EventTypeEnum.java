package com.github.ontio.model.common;

/**
 * @author zhouq
 * @version 1.0
 * @date 2019/4/28
 */
public enum EventTypeEnum {

    Others("others", 0),
    DeployContract("deploy contract", 1),
    Gasconsume("gasconsume", 2),
    Transfer("transfer", 3),
    Ontid("ontid-", 4),
    Claimrecord("claimRecord-", 5),
    Auth("auth", 6);


    private String des;

    private Integer type;

    EventTypeEnum(String des, Integer type) {
        this.des = des;
        this.type = type;
    }

    public String des() {
        return des;
    }

    public Integer type() {
        return type;
    }

}
