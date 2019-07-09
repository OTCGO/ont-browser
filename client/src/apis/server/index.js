import {
    httpRequests
} from '@/helpers';
import axios from 'axios';

const host = 'https://explorer.ont.io';

// Block
// const getBlockListUrl = `${host}/v2/blocks`;
const getLatestBlockUrl = `${host}/v2/latest-blocks`;
const getBlockUrl = `${host}/v2/blocks`;

//Transaction
const getLatestTransactionUrl = `${host}/v2/latest-transactions`;
// const getTransactionListUrl = `${host}/v2/transactionlist`;
const getTransactionUrl = `${host}/v2/transactions`;

//OntId
const getLatestOntIdUrl = `${host}/v2/latest-ontids`;
// const getOntIdListUrl = `${host}/v2/ontidlist`;
const getOntIdUrl = `${host}/v2/ontids`;


//SummaryInfo
const getSummaryInfoUrl = `${host}/v2/summary/blockchain/latest-info`;


// token oep4 5 8
const getTokenUrl = `${host}/v2/tokens`;
// const getTokenUrl = `${host}/v2/oepcontract`;

// address list
const getAddressListUrl = `${host}/getAssetHolder`;
// account
const getAddressInfoUrl = `${host}/v2/address`;

// contract
const getContractUrl = `${host}/v2/contracts`;

/*
* 获取最新的区块
* @param {*} count
* */
const getLatestBlock = function (count) {
    return httpRequests.get(`${getLatestBlockUrl}?count=${count}`);
};
/**
 * 分页获取区块列表
 *
 * @param {*} page_size
 * @param {*} page_number
 * @returns
 */
const getBlockList = function (page_size, page_number) {
    return httpRequests.get(`${getBlockUrl}`, {
        params: {
            page_size,
            page_number
        }
    });
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
/*
* 获取最新的交易列表
* @param {*} count
* */
const getLatestTransaction = function (count) {
    return httpRequests.get(`${getLatestTransactionUrl}?count=${count}`);
};
/**
 * 分页交易基本信息列表
 *
 * @param {*} page_size
 * @param {*} page_number
 * @returns
 */
const getTransactionList = function (page_size, page_number) {
    return httpRequests.get(`${getTransactionUrl}`, {
        params: {
            page_size,
            page_number
        }
    });
};

/**
 * 根据交易hash获取交易详细信息
 *
 * @param {*} hash
 * @returns
 */
const getTransactionByHash = function (hash) {
    return httpRequests.get(`${getTransactionUrl}/${hash}`);
};

/*
* 获取最新的onId列表
* @param {*} count
* */
const getLatestOntId = function (count) {
    return httpRequests.get(`${getLatestOntIdUrl}?count=${count}`);
};
/**
 * 分页查询OntId信息列表
 *
 * @param {*} page_size
 * @param {*} page_number
 * @returns
 */
const getOntIdList = function (page_size, page_number) {
    return httpRequests.get(`${getOntIdUrl}`, {
        params: {
            page_number,
            page_size
        }
    });
};


/**
 * 查询某个OntId相关信息
 * @param {*} ontid
 * @returns
 */
const getOntId = function (ontid) {
    return httpRequests.get(`${getOntIdUrl}/${ontid}/ddo`);
};
/**
 * 分页查询某个OntId事件
 * @param {*} ontid
 * @param {*} page_size
 * @param {*} page_number
 * @returns
 */
const getOntIdEvents = function (ontid, page_size, page_number) {
    return httpRequests.get(`${getOntIdUrl}/${ontid}/transactions`, {
        params: {
            page_size,
            page_number
        }
    });
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
 * @param {*} page_size
 * @param {*} page_number
 * @returns
 */
const getTokenList = function (type, page_size, page_number) {
    return httpRequests.get(`${getTokenUrl}/${type}`, {
        params: {
            page_size,
            page_number
        }
    });
};

/**
 * contracthash 获取通证详细信息
 *
 * @param {*} type
 * @param {*} contracthash
 * @returns
 */
const getTokenDetail = function (type, contracthash) {
    return httpRequests.get(`${getTokenUrl}/${type}/${contracthash}`);
};
/**j
 * contracthash 获取通证详细交易列表
 *
 * @param {*} type
 * @param {*} contracthash
 * @param {*} page_size
 * @param {*} page_number
 * @returns
 */
const getTokenTranslate = function (type, contracthash, page_size, page_number) {
    return httpRequests.get(`${getContractUrl}/${type}/${contracthash}/transactions`, {
       params:{
           page_size,
           page_number
       }
    });
};

/**
 * 分页查询某个地址的所有转账交易信息
 *
 * @param {*} address
 * @param {*} page_size
 * @param {*} page_number
 * @returns
 */
const getAddressInfo = function (address, page_size, page_number) {
    return httpRequests.get(`${getAddressInfoUrl}/${address}/transactions`, {
        params: {
            page_number,
            page_size
        }
    });
};
/**
 * 查询某个地址的所有资产信息
 *
 * @param {*} address
 * @param {*} type
 * @returns
 */
const getAddressBalances = function (address, type) {
    return httpRequests.get(`${getAddressInfoUrl}/${address}/${type}/balances`);
};
/*
*
* 分页查询地址列表
*
* */
const getAddressList = function (page_number, pageSize, token = 'ont') {
    return axios(`${getAddressListUrl}`, {
        cache: 'no-cache',
        method: 'GET',
        params: {
            qid: 1,
            contract: token === 'ont' ? '0100000000000000000000000000000000000000' : '0200000000000000000000000000000000000000',
            from: (page_number - 1) * pageSize,
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
 * @returns
 */
const getContractInfo = function (contracthash) {
    return httpRequests.get(`${getContractUrl}/${contracthash}`);
};
/**
 * 获取合约详情交易列表
 *
 * @param {*} contracthash
 * @param {*} page_size
 * @param {*} page_number
 * @returns
 */
const getContractTransactions = function (contracthash, page_size, page_number) {
    return httpRequests.get(`${getContractUrl}/${contracthash}/transactions`, {
        params: {
            page_size,
            page_number
        }
    });
};
/**
 * 获取合约详情数据统计
 *
 * @param {*} contracthash
 * @param {*} start_time
 * @param {*} end_time
 * @returns
 */
const getContractDaily = function (contracthash, start_time, end_time) {
    return httpRequests.get(`${getContractUrl}/${contracthash}/daily`, {
        params: {
            start_time,
            end_time
        }
    });
};

/**
 * 获取合约列表
 *
 * @param {*} page_size
 * @param {*} page_number
 * @returns
 */
const getContracts = function (page_size, page_number) {
    return httpRequests.get(`${getContractUrl}`, {
        params: {
            page_number,
            page_size
        }
    });
};


export {
    getLatestBlock,
    getBlockList,
    getBlockByHeightOrHash,
    getLatestTransaction,
    getTransactionList,
    getTransactionByHash,
    getLatestOntId,
    getOntIdList,
    getOntId,
    getOntIdEvents,
    getSummaryInfo,
    getTokenList,
    getTokenTranslate,
    getTokenDetail,
    getContractInfo,
    getContracts,
    getContractTransactions,
    getContractDaily,
    getAddressList,
    getAddressInfo,
    getAddressBalances
};