package com.github.ontio.explorersummary.mapper;

import com.github.ontio.explorersummary.model.NodeInfoOffChain;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

@Repository
public interface NodeInfoOffChainMapper extends Mapper<NodeInfoOffChain> {
    String selectNameByPublicKey(String publicKey);
}