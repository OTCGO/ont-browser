import {
    httpRequests
} from '@/helpers';
import axios from 'axios';

//const host = 'https://explorer.ont.io';

const host = 'http://114.215.30.71:8585';
const otcHost = 'https://api.otcgo.cn';
const version = 'v2'

// Block
// const getBlockListUrl = `${host}/v2/blocks`;
const getLatestBlockUrl = `${host}/${version}/latest-blocks`;
const getBlockUrl = `${host}/${version}/blocks`;

//Transaction
const getLatestTransactionUrl = `${host}/${version}/latest-transactions`;
// const getTransactionListUrl = `${host}/v2/transactionlist`;
const getTransactionUrl = `${host}/${version}/transactions`;

//OntId
const getLatestOntIdUrl = `${host}/${version}/latest-ontids`;
// const getOntIdListUrl = `${host}/v2/ontidlist`;
const getOntIdUrl = `${host}/${version}/ontids`;


//SummaryInfo
const getSummaryInfoUrl = `${host}/${version}/summary/blockchain/latest-info`;


// token oep4 5 8
const getTokenUrl = `${host}/${version}/tokens`;
// const getTokenUrl = `${host}/v2/oepcontract`;

// address list
const getAddressListUrl = `${otcHost}/v2/mainnet/rankings`;
// account
const getAddressInfoUrl = `${host}/${version}/addresses`;

// contract
const getContractUrl = `${host}/${version}/contracts`;


// balance 
const getAddressBalancesUrl  = `${host}/${version}/addresses`;
// const getAddressOep4Balances
// const getAddressOep5Balances
// const getAddressOep8Balances


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
        params: {
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
const getTransactions= function (address, page_size, page_number) {
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
    return httpRequests.get(`${getAddressBalancesUrl}/${address}/${type}/balances`);
};
/*
 *
 * 分页查询地址列表
 *
 * */
const getAddressList = function (page_number, pageSize, token = 'ont') {
    return axios(`${getAddressListUrl}/${token === 'ont' ? '0000000000000000000000000000000000000001' : '0000000000000000000000000000000000000002'}`, {
        cache: 'no-cache',
        method: 'GET',
        params: {
            index: (page_number - 1) * pageSize,
            length: pageSize
        }
    }).then(response => {
        if (response.data.code === 200) return response.data;
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
    getTransactions,
    getAddressBalances
};