/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.github.ontio.explorersummary.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import javax.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_contract")
public class Contract {
    @Id
    @Column(name = "contract_hash")
    private String contractHash;

    private String name;

    @Column(name = "create_time")
    private Integer createTime;

    @Column(name = "update_time")
    private Integer updateTime;

    /**
     * 审核标识，1：审核通过 0：未审核
     */
    @Column(name = "audit_flag")
    private Integer auditFlag;

    @Column(name = "contact_info")
    private String contactInfo;

    private String description;

    /**
     * contract type，oep4，oep5，oep8，others
     */
    private String type;

    /**
     * contract logo url
     */
    private String logo;

    private String creator;

    @Column(name = "address_count")
    private Integer addressCount;

    @Column(name = "tx_count")
    private Integer txCount;

    @Column(name = "ont_sum")
    private BigDecimal ontSum;

    @Column(name = "ong_sum")
    private BigDecimal ongSum;

    /**
     * 该合约的总的token流通量.json格式字符串
     */
    @Column(name = "token_sum")
    private String tokenSum;

    /**
     * contract category
     */
    private String category;

    @Column(name = "dapp_name")
    private String dappName;

    /**
     * Dappstore审核标识。1：合约属于dappstore，0：合约不属于dappstore
     */
    @Column(name = "dappstore_flag")
    private Integer dappstoreFlag;

    @Column(name = "total_reward")
    private BigDecimal totalReward;

    @Column(name = "lastweek_reward")
    private BigDecimal lastweekReward;

    private String abi;

    private String code;

    @Column(name = "source_code")
    private String sourceCode;

}