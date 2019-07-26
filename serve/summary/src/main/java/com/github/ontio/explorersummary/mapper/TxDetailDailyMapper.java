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

package com.github.ontio.explorersummary.mapper;

import com.github.ontio.explorersummary.model.TxDetailDaily;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Repository
public interface TxDetailDailyMapper extends Mapper<TxDetailDaily> {
    // self-defined SQL
    int selectiveByEndTime(@Param("endTime") Integer endTime);

    int deleteByEndTime(@Param("endTime") Integer endTime);

    BigDecimal selectContractAssetAmount(@Param("contractHash") String contractHash, @Param("assetName") String assetName);

    Integer selectTxCount(@Param("contractHash") String contractHash);

    List<String> selectContractAddr4Dapp(@Param("contractHash") String contractHash);

    List<String> selectContractAddr(@Param("contractHash") String contractHash);

    List<Map> selectContractTokenAllSum(Map<String, Object> paramMap);
}