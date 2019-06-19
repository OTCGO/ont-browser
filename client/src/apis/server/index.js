import {
    httpRequests
} from '@/helpers';
import axios from "axios";
const host = 'https://explorer.ont.io';

// Block
const getBlockListUrl = `${host}/api/v1/explorer/blocklist`;
const getBlockUrl = `${host}/api/v1/explorer/block`;

//Transaction
const getTransactionListUrl = `${host}/api/v1/explorer/transactionlist`;
const getTransactionByHashUrl = `${host}/api/v1/explorer/transaction`;

//OntId
const getOntIdListUrl = `${host}/api/v1/explorer/ontidlist`;
const getOntIdUrl = `${host}/api/v1/explorer/ontid`;


//SummaryInfo
const getSummaryInfoUrl = `${host}/api/v1/explorer/summary`;


// token oep4 5 8
const getTokenListUrl = `${host}/api/v1/explorer/oepcontract`;
const getTokenUrl = `${host}/api/v1/explorer/oepcontract`;

// address list
const getAddressListUrl = `${host}/getAssetHolder`;
// account
const getAddressInfoUrl = `${host}/api/v1/explorer/address`;

// contract
const getContractUrl = `${host}/api/v1/explorer/contract`;
/**
 * 分页获取区块列表
 *
 * @param {*} pagesize
 * @param {*} pagenumber
 * @returns
 */
const getBlockList = function (pagesize, pagenumber) {
    return httpRequests.get(`${getBlockListUrl}/${pagesize}/${pagenumber}`);
};

/**
 * 根据区块高度或区块hash获取区块详情
 *
 * @param {*} param height || hash
 * @returns
 */
const getBlockByHeightOrHash = function (param) {
    return httpRequests.get(`${getBlockUrl}/${param}`);
};

/**
 * 分页交易基本信息列表
 *
 * @param {*} pagesize
 * @param {*} pagenumber
 * @returns
 */
const getTransactionList = function (pagesize, pagenumber) {
    return httpRequests.get(`${getTransactionListUrl}/${pagesize}/${pagenumber}`);
};

/**
 * 根据交易hash获取交易详细信息
 *
 * @param {*} hash
 * @returns
 */
const getTransactionByHash = function (hash) {
    return httpRequests.get(`${getTransactionByHashUrl}/${hash}`);
};


/**
 * 分页查询OntId信息列表
 *
 * @param {*} pagesize
 * @param {*} pagenumber
 * @returns
 */
const getOntIdList = function (pagesize, pagenumber) {
    return httpRequests.get(`${getOntIdListUrl}/${pagesize}/${pagenumber}`);
};


/**
 * 分页查询某个OntId相关信息
 * @param {*} ontid
 * @param {*} pagesize
 * @param {*} pagenumber
 * @returns
 */
const getOntId = function (ontid, pagesize, pagenumber) {
    return httpRequests.get(`${getOntIdUrl}/${ontid}/${pagesize}/${pagenumber}`);
};


/**
 * 区块链统计信息查询
 *
 * @returns
 */
const getSummaryInfo = function () {
    return httpRequests.get(`${getSummaryInfoUrl}`);
};


/**
 * 获取通证列表信息
 *
 * @param {*} type
 * @param {*} pagesize
 * @param {*} pagenumber
 * @returns
 */
const getTokenList = function (type, pagesize, pagenumber) {
    return httpRequests.get(`${getTokenListUrl}/${type}/${pagesize}/${pagenumber}`);
};


/**
 * contracthash 获取通证详细信息
 *
 * @param {*} type
 * @param {*} contracthash
 * @param {*} pagesize
 * @param {*} pagenumber
 * @returns
 */
const getToken = function (type, contracthash, pagesize, pagenumber) {
    return httpRequests.get(`${getTokenUrl}/${type}/${contracthash}/${pagesize}/${pagenumber}`);
};

/**
 * 分页查询某个地址的所有转账交易信息
 *
 * @param {*} address
 * @param {*} pagesize
 * @param {*} pagenumber
 * @returns
 */
const getAddressInfo = function (address, pagesize, pagenumber) {
    return httpRequests.get(`${getAddressInfoUrl}/${address}/${pagesize}/${pagenumber}`);
};
/*
*
* 分页查询地址列表
*
* */
const getAddressList = function (pagenumber, pageSize, token = 'ont') {
    return axios(`${getAddressListUrl}`, {
        cache: "no-cache",
        method:'GET',
        params: {
            qid: 1,
            contract: token === 'ont' ? '0100000000000000000000000000000000000000' : '0200000000000000000000000000000000000000',
            from: (pagenumber - 1) * pageSize,
            count: pageSize
        }
    }).then(response => {
        if (response.data.error_code === 0) return response.data.result;
    });
};
/**
 * 获取合约详情
 *
 * @param {*} contracthash
 * @param {*} pagesize
 * @param {*} pagenumber
 * @returns
 */
const getContractInfo = function (contracthash, pagesize, pagenumber) {
    return httpRequests.get(`${getContractUrl}/${contracthash}/${pagesize}/${pagenumber}`);
};
/**
 * 获取合约列表
 *
 * @param {*} pagesize
 * @param {*} pagenumber
 * @returns
 */
const getContracts = function (pagesize, pagenumber) {
    return httpRequests.get(`${getContractUrl}/${pagesize}/${pagenumber}`);
};


export {
    getBlockList,
    getBlockByHeightOrHash,
    getTransactionList,
    getTransactionByHash,
    getOntIdList,
    getOntId,
    getSummaryInfo,
    getTokenList,
    getToken,
    getAddressInfo,
    getContractInfo,
    getContracts,
    getAddressList
};