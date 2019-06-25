//简体中文
module.exports = {
    logo: require('@/assets/images/logo_zh.svg'),
    language: 'zhCHS',
    title: 'ONT区块浏览器',
    search: '查询',
    hash:'哈希',
    time:'时间',
    size:'大小',
    height:'高度',
    status:'状态',
    208:'部署智能合约',
    209:'调用智能合约',
    searchError:'对不起，无法找到您输入的搜索内容',
    tips:'提示',
    confirmed:'已确认',
    error:'交易失败',
    menu: {
        home: '首页',
        assets: '资产',
        contracts: '合约',
        api: 'API',
        language: '语言',
        wallet: 'SEA钱包'
    },
    slider: {
        dynamic: {
            name: '最新动态',
            search: '请输入区块高度、地址、ONT ID或交易标识'
        },
        market: {
            name: '最新行情'
        },
        transaction: {
            name: '最新交易'
        },
        block: {
            name: '最新区块'
        },
        address: {
            name: '最新地址'
        },
        ontId:{
            name:'最新ID事件'
        }
    },
    dynamic: {
        blockHeight:'当前区块高度',
        nodes:"知识节点数量",
        transactionNum: '当前交易笔数',
        addressNum: '注册地址数量',
        ontIdNum:'ONT ID 数量',
        startTime: '开始时间',
        runTime: '运行时间',
        blockNum: '区块数量',
        assetNum: '资产数量',
        day: '天',
        second: '秒',
        newBlock: '新块时间'
    },
    block: {
        name: '区块信息',
        index: '索引',
        hash: '散列值',
        byte: '字节',
        version: '版本',
        merkleroot: 'Merkle 根',
        invocationScript: '合约脚本',
        verificationScript: '验证脚本',
        height: '高度',
        size: '大小',
        transactions: '交易数',
        time: '时间',
        DetailTitle:'区块详情'
    },
    transaction: {
        name: '交易信息',
        type: '类型',
        fee:'手续费',
        networkFee: '网络费用',
        systemFee: '系统费用',
        transactionId: '交易标识',
        time: '时间',
        size: '大小',
        invocationScript: '合约脚本',
        verificationScript: '验证脚本',
        sentFrom: '转出',
        sentTo: '转入',
        desc:'描述',
        assets:'资产',
        description:'操作',
        amount:'总量'
    },
    address: {
        title:'持仓排名',
        percent:'占比',
        value: '地址',
        blockIndex: '区块高度',
        time: '时间',
        newWallet: '创建钱包',
        openWallet: '登陆钱包',
        balance: '余额',
        rank: '排名',
        zero: '该地址余额为0',
        update: '每周更新数据',
        detailTitle:'地址详情',
        unbound:'未解绑',
        claimable:'待提取'
    },
    asset: {
        name: '名称',
        type: '类型',
        assetId: '标识',
        amount: '总量',
        symbol: '符号',
        info: '资产信息'
    },
    contract: {
        title:'合约',
        name: '合约名称',
        hash: '哈希',
        transactions: '交易数量',
        transaction: '交易',
        createTime: '创建时间',
        detailTitle:'合约详情',
        creator:'创建者',
        address:'持币地址',
        volume:'流水总量',
        block:'区块',
        fee:'费用'
    },
    ontId:{
        title:'最新 ONT ID',
        desc:'描述',
        fee:'费用',
        event:'在这个ONT ID 上的事件',
        detail:'详情',
        owner:'所属人',
    },
    pagination: {
        current: '当前',
        to: '至',
        total: '共',
        next: '下一页',
        prev: '上一页'
    },
    token:{
        title:'资产列表',
        name:'名称',
        amount:'总量',
        txCount:'交易数',
        addresses:'地址数量',
        symbol:'符号',
    },
    footer: {
        link: '相关链接',
        version: '节点版本',
        SEA: 'SEA',
        NEO: 'NEO',
        ont: '本体网络',
        cryptogladiator: '疯狂角斗士',
        alchemint: '阿基米德稳定币',
        loopring: '路印协议',
        binance: '币安',
        byb: '币用宝',
        nns: 'NNS',
        zdpvt: '支点'
    }
};