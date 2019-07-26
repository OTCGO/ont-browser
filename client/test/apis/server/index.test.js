import {
    getBlockList,
    getBlockByHeightOrHash,
    getTransactionList,
    getTransactionByHash,
    getOntIdList,
    getOntId,
    getSummaryInfo,
    getTokenList,
    getToken,
    getAddressInfo
} from '@/apis/server/index'
import test from 'ava';


test('server getBlockList', async t => {
    const result = await getBlockList(20, 1)
    console.log('getBlockList', result)
    t.pass()
});


test('server getBlockByHeightOrHash', async t => {
    const result = await getBlockByHeightOrHash(1)
    console.log('getBlockByHeightOrHash', result)
    t.pass()
});



test('server getTransactionList', async t => {
    const result = await getTransactionList(20, 1)
    console.log('getTransactionList', result)
    t.pass()
});

test('server getTransactionByHash', async t => {
    const result = await getTransactionByHash('257056ed4c38acd45b16aa15e3147e08ea23dae65139e0c5ae349ab09fd40fe4')
    console.log('getTransactionByHash', result)
    t.pass()
});

test('server getOntIdList', async t => {
    const result = await getOntIdList(20, 1)
    console.log('getOntIdList', result)
    t.pass()
});

test('server getOntId', async t => {
    const result = await getOntId('did:ont:ARrDtUMviVWJReLcpdLPUhr1NfvYXnTVuu', 20, 1)
    console.log('getOntId', result)
    t.pass()
});

test('server getSummaryInfo', async t => {
    const result = await getSummaryInfo()
    console.log('getSummaryInfo', result)
    t.pass()
});

test('server getTokenList nep4', async t => {
    const result = await getTokenList('oep4', 20, 1)
    console.log('getTokenList nep4', result.total)
    t.pass()
});

test('server getTokenList nep5', async t => {
    const result = await getTokenList('oep5', 20, 1)
    console.log('getTokenList oep5', result.total)
    t.pass()
});

test('server getTokenList oep8', async t => {
    const result = await getTokenList('oep8', 20, 1)
    console.log('getTokenList oep8', result.total)
    t.pass()
});

test('server getToken oep8', async t => {
    const result = await getToken('oep8', 'edf64937ca304ea8180fa92e2de36dc0a33cc712', 20, 1)
    console.log('getTokenList oep8', result)
    t.pass()
});


test('server getAddressInfo', async t => {
    const result = await getAddressInfo('AHDP1jtfMA1vMpy3Gy41vMfyVWQym4eTwu', 20, 1)
    console.log('getAddressInfo', result)
    t.pass()
});