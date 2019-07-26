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

package com.github.ontio.explorersummary.task;

import com.github.ontio.explorersummary.common.Utils;
import com.github.ontio.explorersummary.service.CandidateNodeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@EnableScheduling
public class NodeSchedule {

    private final Utils utils;

    private final CandidateNodeService candidateNodeService;

    @Autowired
    public NodeSchedule(Utils utils, CandidateNodeService candidateNodeService) {
        this.utils = utils;
        this.candidateNodeService = candidateNodeService;
    }

    @Scheduled(fixedDelay = 300000)
    public void updateNodeInfo() {
        try {
            log.info("Update candida node information task begin at {}", utils.getCurrentTime());
            candidateNodeService.updateInfo();
            log.info("Update candida node information task end at {}", utils.getCurrentTime());
        } catch (Exception e) {
            log.warn("An error occur: ", e);
            log.info("Restart Update candida node information task again at {}", utils.getCurrentTime());
            updateNodeInfo();
        }
    }
}
