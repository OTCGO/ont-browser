package com.github.ontio.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.github.ontio.config.ParamsConfig;
import com.github.ontio.mapper.Oep4Mapper;
import com.github.ontio.mapper.Oep5Mapper;
import com.github.ontio.mapper.Oep8Mapper;
import com.github.ontio.mapper.TxDetailMapper;
import com.github.ontio.model.common.PageResponseBean;
import com.github.ontio.model.common.ResponseBean;
import com.github.ontio.model.dao.Oep4;
import com.github.ontio.model.dao.Oep5;
import com.github.ontio.model.dto.BalanceDto;
import com.github.ontio.model.dto.TransferTxDetailDto;
import com.github.ontio.model.dto.TransferTxDto;
import com.github.ontio.service.IAddressService;
import com.github.ontio.util.ConstantParam;
import com.github.ontio.util.ErrorInfo;
import com.github.ontio.util.Helper;
import com.github.ontio.util.OntologySDKService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;

/**
 * @author zhouq
 * @version 1.0
 * @date 2019/4/28
 */
@Slf4j
@Service("AddressService")
public class AddressServiceImpl implements IAddressService {

    private final Oep4Mapper oep4Mapper;
    private final Oep8Mapper oep8Mapper;
    private final Oep5Mapper oep5Mapper;
    private final TxDetailMapper txDetailMapper;
    private final ParamsConfig paramsConfig;

    @Autowired
    public AddressServiceImpl(Oep4Mapper oep4Mapper, Oep8Mapper oep8Mapper, Oep5Mapper oep5Mapper, TxDetailMapper txDetailMapper, ParamsConfig paramsConfig) {
        this.oep4Mapper = oep4Mapper;
        this.oep8Mapper = oep8Mapper;
        this.oep5Mapper = oep5Mapper;
        this.txDetailMapper = txDetailMapper;
        this.paramsConfig = paramsConfig;
    }

    @Autowired
    private BalanceTask balanceTask;

    private OntologySDKService sdk;

    private synchronized void initSDK() {
        if (sdk == null) {
            sdk = OntologySDKService.getInstance(paramsConfig);
        }
    }


    @Override
    public ResponseBean queryAddressBalance(String address, String tokenType) {

        List<BalanceDto> balanceList = new ArrayList<>();

        switch (tokenType.toLowerCase()) {
            case ConstantParam.ASSET_TYPE_OEP4:
                balanceList = getOep4Balance(address);
                break;
            case ConstantParam.ASSET_TYPE_OEP5:
                balanceList = getOep5Balance(address);
                break;
            case ConstantParam.ASSET_TYPE_OEP8:
                balanceList = getOep8Balance(address);
                break;
            case ConstantParam.ASSET_TYPE_NATIVE:
                balanceList = getNativeBalance(address);
                break;
        }

        return new ResponseBean(ErrorInfo.SUCCESS.code(), ErrorInfo.SUCCESS.desc(), balanceList);
    }

    /**
     * 获取原生资产余额
     *
     * @param address
     * @return
     */
    private List<BalanceDto> getNativeBalance(String address) {

        List<BalanceDto> balanceList = new ArrayList<>();

        initSDK();
        Map<String, Object> balanceMap = sdk.getNativeAssetBalance(address);
        //ONG
        BalanceDto balanceDto1 = BalanceDto.builder()
                .assetName(ConstantParam.ONG)
                .assetType(ConstantParam.ASSET_TYPE_NATIVE)
                .balance((new BigDecimal((String) balanceMap.get(ConstantParam.ONG)).divide(ConstantParam.ONG_TOTAL)))
                .build();
        balanceList.add(balanceDto1);

        //等待提取的ONG
        String waitBoundOng = calculateWaitingBoundOng(address, (String) balanceMap.get(ConstantParam.ONT));
        BalanceDto balanceDto2 = BalanceDto.builder()
                .assetName(ConstantParam.WAITBOUND_ONG)
                .assetType(ConstantParam.ASSET_TYPE_NATIVE)
                .balance((new BigDecimal(waitBoundOng)))
                .build();
        balanceList.add(balanceDto2);

        //可提取的ONG
        String unBoundOng = sdk.getUnBoundOng(address);
        if (Helper.isEmptyOrNull(unBoundOng)) {
            unBoundOng = "0";
        }
        BalanceDto balanceDto3 = BalanceDto.builder()
                .assetName(ConstantParam.UNBOUND_ONG)
                .assetType(ConstantParam.ASSET_TYPE_NATIVE)
                .balance((new BigDecimal(unBoundOng)))
                .build();
        balanceList.add(balanceDto3);

        //ONT
        BalanceDto balanceDto4 = BalanceDto.builder()
                .assetName(ConstantParam.ONT)
                .assetType(ConstantParam.ASSET_TYPE_NATIVE)
                .balance(new BigDecimal((String) balanceMap.get(ConstantParam.ONT)))
                .build();
        balanceList.add(balanceDto4);

        return balanceList;
    }

    /**
     * 获取OEP4余额
     *
     * @param address
     * @return
     */
    private List<BalanceDto> getOep4Balance(String address) {

        List<BalanceDto> balanceList = new ArrayList<>();
        initSDK();
        //审核过的OEP4余额
        Oep4 oep4Temp = new Oep4();
        oep4Temp.setAuditFlag(ConstantParam.AUDIT_PASSED);
        List<Oep4> oep4s = oep4Mapper.select(oep4Temp);
        for (Oep4 oep4 :
                oep4s) {
            String contractHash = oep4.getContractHash();
            BigDecimal balance = new BigDecimal(sdk.getOep4AssetBalance(address, contractHash)).divide(new BigDecimal(Math.pow(10, oep4.getDecimals())));
            if (balance.compareTo(ConstantParam.ZERO) == 0) {
                continue;
            }
            BalanceDto balanceDto = BalanceDto.builder()
                    .assetName(oep4.getSymbol())
                    .assetType(ConstantParam.ASSET_TYPE_OEP4)
                    .balance(balance)
                    .build();
            balanceList.add(balanceDto);
        }
        return balanceList;
    }

    /**
     * 获取OEP5余额
     *
     * @param address
     * @return
     */
    private List<BalanceDto> getOep5Balance(String address) {

        List<BalanceDto> balanceList = new ArrayList<>();
        initSDK();
        //审核过的OEP5余额
        Oep5 oep5Temp = new Oep5();
        oep5Temp.setAuditFlag(ConstantParam.AUDIT_PASSED);
        List<Oep5> oep5s = oep5Mapper.select(oep5Temp);
        for (Oep5 oep5 :
                oep5s) {
            String contractHash = oep5.getContractHash();
            BigDecimal balance = new BigDecimal(sdk.getOep5AssetBalance(address, contractHash));
            if (balance.compareTo(ConstantParam.ZERO) == 0) {
                continue;
            }
            BalanceDto balanceDto = BalanceDto.builder()
                    .assetName(oep5.getSymbol())
                    .assetType(ConstantParam.ASSET_TYPE_OEP5)
                    .balance(balance)
                    .build();
            balanceList.add(balanceDto);
        }
        return balanceList;
    }

    /**
     * 获取OEP8余额
     *
     * @param address
     * @return
     */
    private List<BalanceDto> getOep8Balance(String address) {

        List<BalanceDto> balanceList = new ArrayList<>();
        initSDK();
        //审核过的OEP8余额
        List<Map<String, String>> oep8s = oep8Mapper.selectAuditPassedOep8();
        for (Map<String, String> map :
                oep8s) {
            String contractHash = map.get("contractHash");
            String symbol = map.get("symbol");

            JSONArray balanceArray = sdk.getOpe8AssetBalance(address, contractHash);
            String[] symbolArray = symbol.split(",");
            for (int i = 0; i < symbolArray.length; i++) {
                if (Integer.parseInt((String) balanceArray.get(i)) == 0) {
                    continue;
                }
                BalanceDto balanceDto = BalanceDto.builder()
                        .assetName(symbolArray[i])
                        .assetType(ConstantParam.ASSET_TYPE_OEP8)
                        .balance(new BigDecimal((String) balanceArray.get(i)))
                        .build();
                balanceList.add(balanceDto);
            }
        }
        return balanceList;
    }

    /**
     * 计算待提取的ong
     *
     * @param address
     * @param ont
     * @return
     */
    private String calculateWaitingBoundOng(String address, String ont) {

        Integer txtime = txDetailMapper.selectLatestOntTransferTxTime(address);

        if (Helper.isEmptyOrNull(txtime)) {
            return "0";
        }
        long now = System.currentTimeMillis() / 1000L;
        log.info("calculateWaitingBoundOng latestOntTransferTxTime:{},now:{}", txtime, now);

        BigDecimal totalOng = new BigDecimal(now).subtract(new BigDecimal(txtime)).multiply(paramsConfig.ONG_SECOND_GENERATE);
        BigDecimal ong = totalOng.multiply(new BigDecimal(ont)).divide(ConstantParam.ONT_TOTAL);

        return ong.toPlainString();
    }

    /**
     * 获取账户余额，可提取的ong，待提取的ong
     *
     * @param address
     * @return
     */
    private List<BalanceDto> getAddressBalance(String address, String assetName) {

        List<BalanceDto> balanceList = new ArrayList<>();

        initSDK();
        Map<String, Object> balanceMap = sdk.getNativeAssetBalance(address);

        if (Helper.isEmptyOrNull(assetName) || ConstantParam.ONG.equals(assetName)) {

            BalanceDto balanceDto1 = BalanceDto.builder()
                    .assetName(ConstantParam.ONG)
                    .assetType(ConstantParam.ASSET_TYPE_NATIVE)
                    .balance((new BigDecimal((String) balanceMap.get(ConstantParam.ONG)).divide(ConstantParam.ONG_TOTAL)))
                    .build();
            balanceList.add(balanceDto1);

            //计算等待提取的ong
            String waitBoundOng = calculateWaitingBoundOng(address, (String) balanceMap.get(ConstantParam.ONT));
            BalanceDto balanceDto2 = BalanceDto.builder()
                    .assetName(ConstantParam.WAITBOUND_ONG)
                    .assetType(ConstantParam.ASSET_TYPE_NATIVE)
                    .balance((new BigDecimal(waitBoundOng)))
                    .build();
            balanceList.add(balanceDto2);


            //获取可提取的ong
            String unBoundOng = sdk.getUnBoundOng(address);
            if (Helper.isEmptyOrNull(unBoundOng)) {
                unBoundOng = "0";
            }
            //计算等待提取的ong
            BalanceDto balanceDto3 = BalanceDto.builder()
                    .assetName(ConstantParam.UNBOUND_ONG)
                    .assetType(ConstantParam.ASSET_TYPE_NATIVE)
                    .balance((new BigDecimal(unBoundOng)))
                    .build();
            balanceList.add(balanceDto3);

            //加上ont资产
            if (Helper.isEmptyOrNull(assetName)) {
                BalanceDto balanceDto4 = BalanceDto.builder()
                        .assetName(ConstantParam.ONT)
                        .assetType(ConstantParam.ASSET_TYPE_NATIVE)
                        .balance(new BigDecimal((String) balanceMap.get(ConstantParam.ONT)))
                        .build();
                balanceList.add(balanceDto4);
            }

        } else if (ConstantParam.ONT.equals(assetName)) {

            BalanceDto balanceDto = BalanceDto.builder()
                    .assetName(ConstantParam.ONT)
                    .assetType(ConstantParam.ASSET_TYPE_NATIVE)
                    .balance(new BigDecimal((String) balanceMap.get(ConstantParam.ONT)))
                    .build();
            balanceList.add(balanceDto);
        }

        List<Future<List<BalanceDto>>> futureList = new ArrayList<>();
        //审核过的OEP4余额
        Oep4 oep4Temp = new Oep4();
        oep4Temp.setAuditFlag(ConstantParam.AUDIT_PASSED);
        List<Oep4> oep4s = oep4Mapper.select(oep4Temp);
        log.info("query oep4 balance begin.....");
        for (Oep4 oep4 :
                oep4s) {
            Future<List<BalanceDto>> task = balanceTask.getBalance(address, ConstantParam.ASSET_TYPE_OEP4, oep4.getContractHash(), oep4.getSymbol(), oep4.getDecimals());
            futureList.add(task);
        }

        //审核过的OEP5余额
        Oep5 oep5Temp = new Oep5();
        oep5Temp.setAuditFlag(ConstantParam.AUDIT_PASSED);
        List<Oep5> oep5s = oep5Mapper.select(oep5Temp);
        log.info("query oep5 balance begin.....");
        for (Oep5 oep5 :
                oep5s) {
            Future<List<BalanceDto>> task = balanceTask.getBalance(address, ConstantParam.ASSET_TYPE_OEP5, oep5.getContractHash(), oep5.getSymbol(), null);
            futureList.add(task);
        }

        //审核过的OEP8余额
        List<Map<String, String>> oep8s = oep8Mapper.selectAuditPassedOep8();
        log.info("query oep8 balance begin.....");
        for (Map<String, String> map :
                oep8s) {
            String contractHash = map.get("contractHash");
            String symbol = map.get("symbol");

            Future<List<BalanceDto>> task = balanceTask.getBalance(address, ConstantParam.ASSET_TYPE_OEP8, contractHash, symbol, null);
            futureList.add(task);
        }
        log.info("wait syn thread.....");
        try {
            //等待异步线程运行完成
            for (Future<List<BalanceDto>> future : futureList) {
                List<BalanceDto> a = future.get();
                balanceList.addAll(a);
            }
        } catch (Exception e) {
            log.error("error...", e);
        }
        log.info("wait syn thread end.....");

        return balanceList;
    }


    @Override
    public ResponseBean queryTransferTxsByPage(String address, String assetName, Integer pageNumber, Integer pageSize) {

        List<TransferTxDto> returnList = new ArrayList<>();
        //查询前（pageNumber * pageSize * 3）条记录
        List<TransferTxDto> transferTxDtos = txDetailMapper.selectTransferTxsByPage(address, assetName, 0, pageNumber * pageSize * 3);

        Integer count = txDetailMapper.selectTransferTxsCount(address, assetName);


        //合并和格式化转账交易记录
        List<TransferTxDto> formattedTransferTxDtos = formatTransferTxDtos(transferTxDtos);

        if (formattedTransferTxDtos.size() > 0 && formattedTransferTxDtos.size() < pageSize * pageNumber) {
            //合并和格式化转账交易记录数 < （pageNumber * pageSize），根据总记录数再重新查询所有的记录
            int transferTxTotal = txDetailMapper.selectTransferTxCountByAddr(address);
            if (transferTxTotal > pageNumber * pageSize * 3) {
                //针对一个地址有T笔1对N转账or一笔1对M转账的特殊处理(T*N>pageNumber*pageSize*3 or M>pageNumber*pageSize*3)
                List<TransferTxDto> transferTxDtos2 = txDetailMapper.selectTransferTxsByPage(address, assetName, 0, transferTxTotal);
                List<TransferTxDto> formattedTransferTxDtos2 = formatTransferTxDtos(transferTxDtos2);

                returnList = getTransferTxDtosByPage(pageNumber, pageSize, formattedTransferTxDtos2);
            } else {
                //总的交易数 < （pageNumber * pageSize * 3），直接根据请求条数进行分页
                returnList = getTransferTxDtosByPage(pageNumber, pageSize, formattedTransferTxDtos);
            }
        } else {
            //格式化后的txlist条数满足分页条件，直接根据请求条数参数进行分页
            //根据分页确认start，end=start+pageSize
            returnList = getTransferTxDtosByPage(pageNumber, pageSize, formattedTransferTxDtos);
        }

        PageResponseBean pageResponseBean = new PageResponseBean(returnList, count);

        return new ResponseBean(ErrorInfo.SUCCESS.code(), ErrorInfo.SUCCESS.desc(), pageResponseBean);
    }


    /**
     * 获取分页后的转账交易列表
     *
     * @param pageNumber
     * @param pageSize
     * @param formattedTransferTxDtos
     * @return
     */
    private List<TransferTxDto> getTransferTxDtosByPage(int pageNumber, int pageSize, List<TransferTxDto> formattedTransferTxDtos) {

        int start = (pageNumber - 1) * pageSize <= 0 ? 0 : (pageNumber - 1) * pageSize;
        int end = (pageSize + start) > formattedTransferTxDtos.size() ? formattedTransferTxDtos.size() : (pageSize + start);

        return formattedTransferTxDtos.subList(start, end);
    }

    @Override
    public ResponseBean queryTransferTxsByTime(String address, String assetName, Long beginTime, Long endTime) {

        //云斗龙资产使用like查询, for ONTO
/*        if (ConstantParam.HYPERDRAGONS.equals(assetName)) {
            assetName = assetName + "%";
            transferTxDtos = txDetailMapper.selectDragonTransferTxsByTime(address, assetName, beginTime, endTime);
        } else {
            transferTxDtos = txDetailMapper.selectTransferTxsByTime(address, assetName, beginTime, endTime);
        }*/

        List<TransferTxDto> transferTxDtos = txDetailMapper.selectTransferTxsByTime(address, assetName, beginTime, endTime);

        List<TransferTxDto> formattedTransferTxDtos = formatTransferTxDtos(transferTxDtos);

        return new ResponseBean(ErrorInfo.SUCCESS.code(), ErrorInfo.SUCCESS.desc(), formattedTransferTxDtos);
    }


    @Override
    public ResponseBean queryTransferTxsByTimeAndPage(String address, String assetName, Long endTime, Integer pageSize) {

        List<TransferTxDto> transferTxDtos = new ArrayList<>();
        //云斗龙资产使用like查询，for ONTO，只查询转账不包括ong手续费记录
        if (ConstantParam.HYPERDRAGONS.equals(assetName)) {
            assetName = assetName + "%";
            transferTxDtos = txDetailMapper.selectDragonTransferTxsByTimeAndPage(address, assetName, endTime, pageSize);
        } else {
            transferTxDtos = txDetailMapper.selectTransferTxsByTimeAndPage(address, assetName, endTime, pageSize);
        }

        List<TransferTxDto> formattedTransferTxDtos = formatTransferTxDtos(transferTxDtos);

        return new ResponseBean(ErrorInfo.SUCCESS.code(), ErrorInfo.SUCCESS.desc(), formattedTransferTxDtos);

    }

    /**
     * 格式化转账交易列表
     *
     * @return
     */
    private List<TransferTxDto> formatTransferTxDtos(List<TransferTxDto> transferTxDtos) {

        List<TransferTxDto> formattedTransferTxs = new ArrayList<>();

        String previousTxHash = "";
        int previousTxIndex = 0;
        for (int i = 0; i < transferTxDtos.size(); i++) {
            TransferTxDto transferTxDto = transferTxDtos.get(i);
            //ONG精度格式化
            String assetName = transferTxDto.getAssetName();
            BigDecimal amount = transferTxDto.getAmount();
            if (ConstantParam.ONG.equals(assetName)) {
                amount = amount.divide(ConstantParam.ONG_TOTAL);
            }

            String txHash = transferTxDto.getTxHash();
            log.info("txHash:{}", txHash);

            if (txHash.equals(previousTxHash)) {
                //自己给自己转账，sql会查询出两条记录.需要判断tx_index是否一样
                if (previousTxIndex != transferTxDto.getTxIndex()) {

                    TransferTxDetailDto transferTxDetailDto = TransferTxDetailDto.builder()
                            .amount(amount)
                            .fromAddress(transferTxDto.getFromAddress())
                            .toAddress(transferTxDto.getToAddress())
                            .assetName(transferTxDto.getAssetName())
                            .build();

                    List<TransferTxDetailDto> transferTxnList = (List<TransferTxDetailDto>) (formattedTransferTxs.get(formattedTransferTxs.size() - 1)).getTransfers();
                    transferTxnList.add(transferTxDetailDto);
                }
                previousTxIndex = transferTxDto.getTxIndex();
            } else {

                previousTxIndex = transferTxDto.getTxIndex();

                TransferTxDetailDto transferTxDetailDto = TransferTxDetailDto.builder()
                        .amount(amount)
                        .fromAddress(transferTxDto.getFromAddress())
                        .toAddress(transferTxDto.getToAddress())
                        .assetName(transferTxDto.getAssetName())
                        .build();
                List<TransferTxDetailDto> transferTxnList = new ArrayList<>();
                transferTxnList.add(transferTxDetailDto);

                transferTxDto.setTransfers(transferTxnList);
                transferTxDto.setFromAddress(null);
                transferTxDto.setToAddress(null);
                transferTxDto.setAmount(null);
                transferTxDto.setAssetName(null);
                transferTxDto.setTxIndex(null);

                formattedTransferTxs.add(transferTxDto);
            }

            previousTxHash = txHash;
        }

        return formattedTransferTxs;
    }


}
