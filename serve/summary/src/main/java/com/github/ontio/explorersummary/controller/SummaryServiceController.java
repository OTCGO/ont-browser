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

package com.github.ontio.explorersummary.controller;

import com.github.ontio.explorersummary.common.Result;
import com.github.ontio.explorersummary.service.SummaryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/v1/summary")
public class SummaryServiceController {
    private final SummaryService summaryService;

    @Autowired
    public SummaryServiceController(SummaryService summaryService) {
        this.summaryService = summaryService;
    }

    @GetMapping(value = "/update/daily")
    public Result updateDailySummary() {
        log.info("Update daily info");
        summaryService.updateDailySummary();
        return new Result(0, "updateDailySummary", "updateDailySummary");
    }

    @GetMapping(value = "/update/contract")
    public Result updateApprovedContractInfo() {
        log.info("Update contract info");
        summaryService.updateApprovedContractInfo();
        return new Result(0, "updateApprovedContractInfo", "updateApprovedContractInfo");
    }
}
