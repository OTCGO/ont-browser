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
import com.github.ontio.explorersummary.service.SummaryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@EnableScheduling
public class DailyInfoSchedule {

    private final Utils utils;

    private final SummaryService summaryService;

    @Autowired
    public DailyInfoSchedule(Utils utils, SummaryService summaryService) {
        this.utils = utils;
        this.summaryService = summaryService;
    }

    @Scheduled(cron = "0 5 0 * * *")
    public void updateDailyInfo() {
        log.info("Update daily information task begin at {}", utils.getCurrentTime());
        summaryService.updateDailySummary();
        log.info("Update daily information task end at {}", utils.getCurrentTime());
    }

    @Scheduled(cron = "0 0/30 * * * *")
    public void updateApprovedContractInfo() {
        log.info("Update approved contract information task begin at {}", utils.getCurrentTime());
        summaryService.updateApprovedContractInfo();
        log.info("Update approved contract information task end at {}", utils.getCurrentTime());
    }
}
