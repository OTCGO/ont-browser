SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `tbl_oep4`;
CREATE TABLE `tbl_oep4`
(
    `contract_hash` varchar(255)   NOT NULL DEFAULT '' COMMENT '合约hash值',
    `name`          varchar(255)   NOT NULL DEFAULT '' COMMENT 'OEP4代币名称',
    `total_supply`  decimal(15, 0) NOT NULL COMMENT 'OEP4代币总量',
    `symbol`        varchar(255)   NOT NULL DEFAULT '' COMMENT 'OEP4代币符号',
    `decimals`      int(11)        NOT NULL COMMENT 'OEP4代币精度',
    `create_time`   datetime       NOT NULL COMMENT '创建时间',
    `audit_flag`    bool           NOT NULL COMMENT '审核标识，1：审核通过 0：未审核',
    `update_time`   datetime                DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (`contract_hash`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
