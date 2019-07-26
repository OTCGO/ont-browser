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

import com.github.ontio.core.governance.PeerPoolItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_candidate_node_summary")
public class CandidateNodeSummary {
    @Id
    @GeneratedValue(generator = "JDBC")
    private Long id;

    private String name;

    @Column(name = "node_rank")
    private Integer nodeRank;

    @Column(name = "current_stake")
    private Long currentStake;

    private String progress;

    @Column(name = "detail_url")
    private String detailUrl;

    @Column(name = "node_index")
    private Integer nodeIndex;

    @Column(name = "public_key")
    private String publicKey;

    private String address;

    private Integer status;

    @Column(name = "init_pos")
    private Long initPos;

    @Column(name = "total_pos")
    private Long totalPos;

    @Column(name = "max_authorize")
    private Long maxAuthorize;

    @Column(name = "node_proportion")
    private String nodeProportion;

    // Self-defined construct method.
    public CandidateNodeSummary(PeerPoolItem item) {
        name = "";
        nodeIndex = item.index;
        publicKey = item.peerPubkey;
        address = item.address.toBase58();
        status = item.status;
        initPos = item.initPos;
        totalPos = item.totalPos;
        nodeProportion = "";
    }
}