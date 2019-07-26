package com.github.ontio.explorersummary.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "config")
public class ConfigParams {

    @Value("${config.main.node}")
    public String MAIN_NODE;

    @Value("${config.main.host}")
    public String MAIN_NODE_HOST;

    @Value("${config.main.abs_path}")
    public String MAIN_NODE_ABS_PATH;

    @Value("${config.main.node_index}")
    public int MAIN_NODE_INDEX;

    @Value("${config.main.node_count}")
    public int MAIN_NODE_COUNT;

    @Value("${config.polaris.node}")
    public String TEST_NODE;

    @Value("${config.polaris.host}")
    public String TEST_NODE_HOST;

    @Value("${config.polaris.abs_path}")
    public String TEST_NODE_ABS_PATH;

    @Value("${config.polaris.node_index}")
    public int TEST_NODE_INDEX;

    @Value("${config.polaris.node_count}")
    public int TEST_NODE_COUNT;

    @Value("${config.candidate.info}")
    public String CANDIDATE_INFO;

    @Value("${config.detail_url}")
    public String DETAIL_URL;

    @Value("${is.testnet}")
    public Boolean IS_TESTNET;

}