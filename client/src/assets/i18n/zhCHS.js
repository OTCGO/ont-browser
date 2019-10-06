//简体中文
module.exports = {
    logo: require('@/assets/images/logo_zh.svg'),
    language: 'zhCHS',
    title: 'ONT区块浏览器',
    search: '查询',
    hash: '哈希',
    time: '时间',
    size: '大小',
    height: '高度',
    status: '状态',
    208: '部署智能合约',
    209: '调用智能合约',
    searchError: '对不起，无法找到您输入的搜索内容',
    tips: '提示',
    confirmed: '已确认',
    error: '交易失败',
    menu: {
        home: '首页',
        block: '区块',
        ontId: 'ONT ID',
        translate: '交易',
        address: '地址',
        assets: '资产',
        contracts: '合约',
        api: 'API',
        language: '语言',
        wallet: 'SEA钱包'
    },
    slider: {
        dynamic: {
            name: '最新动态',
            // search: '请输入区块高度、地址、ONT ID或交易标识'
            search: '请输入区块高度、地址或交易标识'
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
        ontId: {
            name: '最新ID事件'
        }
    },
    dynamic: {
        blockHeight: '当前区块高度',
        nodes: '共识节点数量',
        transactionNum: '当前交易笔数',
        addressNum: '注册地址数量',
        ontIdNum: 'ONT ID 数量',
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
        DetailTitle: '区块详情'
    },
    transaction: {
        name: '交易信息',
        type: '类型',
        fee: '费用',
        networkFee: '网络费用',
        systemFee: '系统费用',
        transactionId: '交易标识',
        time: '时间',
        size: '大小',
        invocationScript: '合约脚本',
        verificationScript: '验证脚本',
        sentFrom: '转出',
        sentTo: '转入',
        desc: '描述',
        assets: '资产',
        description: '操作',
        amount: '总额',
        total:'交易总量'
    },
    address: {
        title: '持仓排名',
        percent: '占比',
        value: '地址',
        blockIndex: '区块高度',
        time: '时间',
        newWallet: '创建钱包',
        openWallet: '登陆钱包',
        balance: '余额',
        rank: '排名',
        zero: '该地址余额为0',
        update: '每周更新数据',
        detailTitle: '地址详情',
        unbound: '未解绑',
        claimable: '待提取',
        total:'地址总数'
    },
    asset: {
        total:'资产总数',
        name: '名称',
        type: '类型',
        assetId: '标识',
        amount: '总量',
        symbol: '符号',
        info: '资产信息'
    },
    contract: {
        title: '合约',
        name: '合约名称',
        hash: '哈希',
        transactions: '交易数量',
        transaction: '交易',
        createTime: '创建时间',
        detailTitle: '合约详情',
        creator: '创建者',
        address: '持币地址',
        volume: '流水总量',
        block: '区块',
        fee: '费用',
        code: '字节代码',
        total: '合约总数',
        symbol:'符号'
    },
    ontId: {
        title: '最新 ONT ID',
        desc: '描述',
        fee: '费用',
        event: 'ONT ID事件',
        detail: '详情',
        owner: '所属人',
        total:'ID 总量'
    },
    pagination: {
        current: '当前',
        to: '至',
        total: '共',
        next: '下一页',
        prev: '上一页'
    },
    token: {
        title: '资产列表',
        total:'资产总数',
        name: '名称',
        amount: '总量',
        txCount: '交易数',
        addresses: '地址数量',
        symbol: '符号',
        code: '字节代码'
    },
    footer: {
        link: '相关链接',
        version: '节点版本',
        SEA:'SEA',
        NEO:'NEO',
        ont:'本体网络',
        cryptogladiator:'疯狂角斗士',
        alchemint:'阿基米德稳定币',
        loopring:'路印协议',
        binance:'币安',
        byb:'币用宝',
        nns:'NNS',
        zdpvt:'支点',
        DBC:'深脑链',
        chainfor:'链向财经',
        bixiaobai:'币小白',
        biyiye:'币一页',
        odaily:'星球日报',
        ihuoqiu:'火球财经',
        blockchainho:'区块链之家论坛',
        BlockCC:'BlockCC',
        WLZJ:'万链之家',
        niubilai:'币莱财经',
        bitansuo:'币探索',
        lianshijie:'链世界',
        qukuainews:'区块链中文网',
        blockcircles:'区块界',
        BTCSOS:'速援财经',
        hunxu:'区块链媒体',
        bitool:'币兔社区',
        tokenpapa:'币头条',
        doubi:'豆币',
        _77zhijia:'77之家',
        BEE360:'BEE360',
        btc112:'千币网',
        bitjia:'比特家',
        _178bit:'口袋比特',
        btc126:'比特币家园',
        btc789:'比特之窗',
        qklyz:'区块链驿站',
        bishequ:'币社区',
        blockisx:'区间集',
        gameyjy:' 区块链游戏研究院',
        qukuailiant:'区块链条网',
        biiquan:'币圈网',
        qzcj:'前瞻区块链财经',
        o_link:'链链财经',
        tokenlab:'通证经济LAB',
        bjiebtc:'币姐教你比特币',
        dubiwang:'读币网',
        _528btc:'币界网',
        taobi:'淘币网',
        lechain:'乐链网',
        dayqkl:'每日区块链',
        hellobtc:'白话区块链',
        block123:'区块链导航',
        BCfans:'BCfans',
        qqbite:'丘比特财经',
        btsabc:'比特帝国',
        jingyublock:'鲸鱼区块链',
        tanuonline:'探牛社区',
        bitbee24:'蜜蜂财经',
        chaindaily:'今日链闻',
        btc120:'币圈子',
        chainpow:'链豹财经',
        queding:'确定财经',
        qianba:'博链财经',
        xiha:'嘻哈',
        worldb:'Blockfo',
        qkl100:'壹佰区块链网',
        sootoo:'维特财经',
        hibtc:'hi区块链',
        bitol:'比特在线',
        ttbite:'天天比特',
        liansiling:'链司令',
        finacerun:'奔跑财经',
        jgy:'九个亿财经',
        bitnews:'比特快讯',
        bikeji:'币科技',
        shenliancaijing:'深链财经',
        blockob:'区块链资讯',
        bcsky:'链天下',
        ok35:'西瓜财经',
        zxbcc:'指向标财经',
        tuoluocaijing:'陀螺财经',
        qkl123:'区块链导航',
        dappOnline:'DappOnline',
    }
};