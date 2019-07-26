///*
// * Copyright (C) 2018 The ontology Authors
// * This file is part of The ontology library.
// * The ontology is free software: you can redistribute it and/or modify
// * it under the terms of the GNU Lesser General Public License as published by
// * the Free Software Foundation, either version 3 of the License, or
// * (at your option) any later version.
// * The ontology is distributed in the hope that it will be useful,
// * but WITHOUT ANY WARRANTY; without even the implied warranty of
// * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// * GNU Lesser General Public License for more details.
// * You should have received a copy of the GNU Lesser General Public License
// * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
// */

package com.github.ontio.explorersummary.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.ontio.OntSdk;
import com.github.ontio.core.governance.PeerPoolItem;
import com.github.ontio.explorersummary.common.ConfigParams;
import com.github.ontio.explorersummary.mapper.NodeInfoOffChainMapper;
import com.github.ontio.explorersummary.mapper.NodeInfoOnChainMapper;
import com.github.ontio.explorersummary.model.NodeInfoOnChain;
import com.github.ontio.sdk.exception.SDKException;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Slf4j
@NoArgsConstructor
@Service("CandidateNodeService")
public class CandidateNodeService {

    private ConfigParams paramsConfig;

    private ObjectMapper objectMapper;

    private OntSdk ontSdk;

    private NodeInfoOnChainMapper nodeInfoOnChainMapper;

    private NodeInfoOffChainMapper nodeInfoOffChainMapper;

    @Autowired
    public CandidateNodeService(ConfigParams paramsConfig,
                                ObjectMapper objectMapper,
                                NodeInfoOnChainMapper nodeInfoOnChainMapper,
                                NodeInfoOffChainMapper nodeInfoOffChainMapper) {
        this.paramsConfig = paramsConfig;
        this.objectMapper = objectMapper;
        this.nodeInfoOnChainMapper = nodeInfoOnChainMapper;
        this.nodeInfoOffChainMapper = nodeInfoOffChainMapper;
        ontSdk = OntSdk.getInstance();
        try {
            ontSdk.getRestful();
        } catch (SDKException e) {
            ontSdk.setRestful(paramsConfig.MAIN_NODE);
        }
    }

    public void updateInfo() {
        Map peerPool = getPeerPool();
        List<NodeInfoOnChain> nodes = getNodesWithAttributes(peerPool);
        System.out.println("nodes:"+nodes.size());
        nodes.sort((v1, v2) -> Long.compare(v2.getInitPos() + v2.getTotalPos(), v1.getInitPos() + v1.getTotalPos()));
        List<NodeInfoOnChain> nodeInfos = calcNodeInfo(nodes);
        nodes = matchNodeName(nodeInfos);
        updateNodesTable(nodes);
    }

    private Map getPeerPool() {
        try {
            return ontSdk.nativevm().governance().getPeerPoolMap();
        } catch (Exception e) {
            log.error("Get peer pool map failed: {}", e.getMessage());
            changeMainNetNode();
            log.info("Change remote node to: {}", paramsConfig.MAIN_NODE);
            return getPeerPool();
        }
    }

    private List<NodeInfoOnChain> getNodesWithAttributes(Map peerPool) {
        List<NodeInfoOnChain> nodes = new ArrayList<>();
        for (Object obj : peerPool.values()) {
            PeerPoolItem item = (PeerPoolItem) obj;
            // consensus nodes and candidate nodes
            if (item.status != 1 && item.status != 2) {
                continue;
            }
            HashMap<String, Object> attribute = getAttributes(item.peerPubkey);
            NodeInfoOnChain node = new NodeInfoOnChain(item);
            node.setMaxAuthorize(Long.parseLong(attribute.get("maxAuthorize").toString()));
            node.setNodeProportion((100 - (int) attribute.get("t1PeerCost")) + "%");
            nodes.add(node);
        }
        return nodes;
    }

    private HashMap<String, Object> getAttributes(String pubKey) {
        TypeReference<HashMap<String, Object>> typeRef = new TypeReference<HashMap<String, Object>>() {
        };
        try {
            String result = ontSdk.nativevm().governance().getPeerAttributes(pubKey);
            return objectMapper.readValue(result, typeRef);
        } catch (Exception e) {
            log.error("Get {}'s peer attributes failed: {}", pubKey, e.getMessage());
            changeMainNetNode();
            log.info("Change remote node to: {}", paramsConfig.MAIN_NODE);
            return getAttributes(pubKey);
        }
    }

    private List<NodeInfoOnChain> calcNodeInfo(List<NodeInfoOnChain> nodes) {
        for (int i = 0; i < nodes.size(); i++) {
            NodeInfoOnChain node = nodes.get(i);
            node.setNodeRank(i + 1);
            BigDecimal currentPos = new BigDecimal(node.getInitPos()).add(new BigDecimal(node.getTotalPos()));
            BigDecimal targetPos = new BigDecimal(node.getInitPos()).add(new BigDecimal(node.getMaxAuthorize()));
            node.setCurrentStake(currentPos.longValue());
            node.setProgress(currentPos.multiply(new BigDecimal(100)).divide(targetPos, 2, RoundingMode.HALF_UP) + "%");
            node.setDetailUrl(paramsConfig.DETAIL_URL + node.getPublicKey());
            nodes.set(i, node);
        }
        return nodes;
    }

    private void changeMainNetNode() {
        paramsConfig.MAIN_NODE_INDEX++;
        if (paramsConfig.MAIN_NODE_INDEX >= paramsConfig.MAIN_NODE_COUNT) {
            paramsConfig.MAIN_NODE_INDEX = 1;
        }
        paramsConfig.MAIN_NODE = paramsConfig.MAIN_NODE_HOST + paramsConfig.MAIN_NODE_INDEX + paramsConfig.MAIN_NODE_ABS_PATH;
    }

    private void updateNodesTable(List<NodeInfoOnChain> nodes) {
        if (nodes.size() == 0) {
            log.warn("update NodeInfoOnchain table failed, nodes list is empty.");
            return;
        }
        int result = nodeInfoOnChainMapper.deleteAll();
        log.info("update NodeInfoOnchain table: delete {} nodes info.", result);
        try {
            result = nodeInfoOnChainMapper.batchInsert(nodes);
            log.info("update NodeInfoOnchain table: insert {} nodes info.", result);
        } catch (Exception e) {
            log.error("Insert {} into tbl_node_info_on_chain failed.", nodes.toString());
            log.error("An exception occurred：Update NodeInfoOnchain table failed: {}", e.getMessage());
        }
    }

    private List<NodeInfoOnChain> matchNodeName(List<NodeInfoOnChain> nodeInfos) {
        int i = 0;
        for (NodeInfoOnChain info : nodeInfos) {
            try {
                String name = nodeInfoOffChainMapper.selectNameByPublicKey(info.getPublicKey());
                if (name == null) {
                    name = "";
                    log.warn("Select name by public key {} failed.", info.getPublicKey());
                }
                info.setName(name);
                nodeInfos.set(i, info);
            } catch (Exception e) {
                log.error("Match node name failed: {}", info.getPublicKey());
                log.error(e.getMessage());
            }
            i++;
        }
        return nodeInfos;
    }
}
