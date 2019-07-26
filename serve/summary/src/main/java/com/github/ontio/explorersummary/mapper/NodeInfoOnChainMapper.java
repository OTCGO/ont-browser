package com.github.ontio.explorersummary.mapper;

import com.github.ontio.explorersummary.model.NodeInfoOnChain;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

@Repository
public interface NodeInfoOnChainMapper extends Mapper<NodeInfoOnChain> {
    // Self-defined SQL.
    int deleteAll();

    int batchInsert(List<NodeInfoOnChain> records);
}