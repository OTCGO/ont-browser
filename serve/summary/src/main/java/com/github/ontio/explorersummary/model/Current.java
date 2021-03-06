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

import javax.persistence.*;

@Table(name = "tbl_current")
public class Current {
    /**
     * 当前同步的最新区块高度
     */
    @Column(name = "block_height")
    private Integer blockHeight;

    /**
     * 当前同步的最新交易数量
     */
    @Column(name = "tx_count")
    private Integer txCount;

    /**
     * 当前同步的最新ONT ID数量
     */
    @Column(name = "ontid_count")
    private Integer ontidCount;

    /**
     * 当前同步的最新非ONT ID相关的交易数量
     */
    @Column(name = "nonontid_tx_count")
    private Integer nonontidTxCount;

    /**
     * 获取当前同步的最新区块高度
     *
     * @return block_height - 当前同步的最新区块高度
     */
    public Integer getBlockHeight() {
        return blockHeight;
    }

    /**
     * 设置当前同步的最新区块高度
     *
     * @param blockHeight 当前同步的最新区块高度
     */
    public void setBlockHeight(Integer blockHeight) {
        this.blockHeight = blockHeight;
    }

    /**
     * 获取当前同步的最新交易数量
     *
     * @return tx_count - 当前同步的最新交易数量
     */
    public Integer getTxCount() {
        return txCount;
    }

    /**
     * 设置当前同步的最新交易数量
     *
     * @param txCount 当前同步的最新交易数量
     */
    public void setTxCount(Integer txCount) {
        this.txCount = txCount;
    }

    /**
     * 获取当前同步的最新ONT ID数量
     *
     * @return ontid_count - 当前同步的最新ONT ID数量
     */
    public Integer getOntidCount() {
        return ontidCount;
    }

    /**
     * 设置当前同步的最新ONT ID数量
     *
     * @param ontidCount 当前同步的最新ONT ID数量
     */
    public void setOntidCount(Integer ontidCount) {
        this.ontidCount = ontidCount;
    }

    /**
     * 获取当前同步的最新非ONT ID相关的交易数量
     *
     * @return nonontid_tx_count - 当前同步的最新非ONT ID相关的交易数量
     */
    public Integer getNonontidTxCount() {
        return nonontidTxCount;
    }

    /**
     * 设置当前同步的最新非ONT ID相关的交易数量
     *
     * @param nonontidTxCount 当前同步的最新非ONT ID相关的交易数量
     */
    public void setNonontidTxCount(Integer nonontidTxCount) {
        this.nonontidTxCount = nonontidTxCount;
    }
}