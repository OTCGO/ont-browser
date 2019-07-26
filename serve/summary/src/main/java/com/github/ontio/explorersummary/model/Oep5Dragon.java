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
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_oep5_dragon")
public class Oep5Dragon {
    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer id;

    /**
     * 合约hash
     */
    @Column(name = "contract_hash")
    private String contractHash;

    /**
     * 该dragon的名称
     */
    @Column(name = "asset_name")
    private String assetName;

    /**
     * 该dragon的基本信息url
     */
    @Column(name = "json_url")
    private String jsonUrl;

}