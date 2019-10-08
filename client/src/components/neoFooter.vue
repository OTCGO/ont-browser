<style lang="less" scoped>
    .ont-footer {
        padding: 1rem 0;
        border-top: 1px solid #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .contacts ul {
            display: flex;
            padding-left: 2rem;
            margin: 1.4rem 0;
            .contact-item {
                margin-right: 2rem;
            }
        }
        .wx {
            position: relative;
        }
        .wx:hover .weixin-qr-code {
            display: block;
        }
        .wrapper {
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #fff;
            width: 2rem;
            a {
                display: block;
                width: 26px;
                height: 26px;
                line-height: 26px;
                color: #fff;
                text-align: center;
                border: 2px solid #fff;
                position: relative;
                &:after {
                    display: inline-block;
                    content: " ";
                    width: 15px;
                    height: 15px;
                    line-height: 15px;
                    border-width: 0 2px 2px 0;
                    border-color: #fff;
                    border-style: solid;
                    transform: rotate(-135deg);
                    transform-origin: center;
                    position: absolute;
                    top: 50%;
                    right: 4px;
                    margin-top: -5px;
                }
            }
        }
        .version {
            margin-top: 0.8rem;
            color: #fff;
        }
        .network {
            margin-top: 1rem;
            a {
                color: #fff;
            }
        }

        .links {
            display: flex;
            color: #fff;
            align-items: center;
            padding-left: 2rem;
            .text-type2 {
                margin-right: 1.4rem;
            }
            .link-list {
                display: flex;
                flex: 1;
                align-items: baseline;
                padding: 0;
                margin-bottom: 0;
                flex-wrap: wrap;
                .link-item {
                    color: #fff;
                    text-decoration: none;
                }
                li + li:before {
                    content:'|';
                    color: white;
                    padding:0 .3rem;
                }
            }
        }
    }

    .ont-footer .weixin-qr-code {
        display: none;
        position: absolute;
        bottom: 100%;
        right: 50%;
        -webkit-transform: translate(50%, -10px);
        transform: translate(50%, -10px);
        -webkit-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.46);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.46);
    }

    .record {
        margin-top: 2rem;
        color: white
    }
    .show-more{
        cursor: pointer;
    }
</style>
<template>
    <div class="ont-footer container">
        <div class="wrapper">
            <a href="javascript:void(0)" style="cursor:pointer" @click="goTop()"></a>
        </div>
        <div class="footer-left">
            <div class="contacts">
                <ul>
                    <li class="contact-item" v-for="item in contacts" v-bind:key="item.title">
                        <a :href="item.href" :class="{wx:item.title==='wx'}" target="_blank">
                            <img :src="item.src" :alt="item.title" width="25" height="25">
                            <template v-if="item.title==='wx'">
                                <div class="weixin-qr-code">
                                    <img src="../assets/images/wxQrcode.jpg" alt="蓝鲸淘智能资产管理平台" width="160">
                                </div>
                            </template>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="links">
            <span class="text-type2" style="align-self: stretch">{{$t("footer.link")}}:</span>
            <ul class="link-list">
                <li v-for="(item,index) in links" v-show="index<=5||isShowMore" v-bind:key="item.index">
                    <a  class="text-color2 link-item" target="_blank" :href="item.href">{{$t(item.text)}}</a>
                </li>
                <li v-show="!isShowMore" class="show-more" @click="isShowMore=!isShowMore">
                    <i class="iconfont iconMore"></i>
                    <i class="iconfont iconMore"></i>
                </li>
            </ul>
        </div>
        <i v-show="isShowMore" style="margin-top:1rem;color: #fff;cursor: pointer" @click="isShowMore=!isShowMore" class="iconfont icontop"></i>
        <div class="version">{{$t("footer.version")}}: v1.7.0</div>
        <div class="network">
            <!-- <a href="javascript:void(0)" @click="selectNetwork">{{ network }}</a> -->
        </div>
        <div class="record">
            Record Number：湘ICP备 16019051号 - 1
        </div>
        <!--<img src="../assets/images/wxQrcode.jpg" width="120" height="120" alt>-->
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isShowMore:false,
                network: localStorage.getItem('network') || 'TestNet',
                links: [
                    {
                        text: this.$t('footer.SEA'),
                        href: 'https://otcgo.cn/'
                    }, {
                        text: this.$t('footer.NEO'),
                        href: 'https://neo.org'
                    }, {
                        text: this.$t('footer.ont'),
                        href: 'https://ont.io'
                    }, {
                        text: this.$t('footer.niubilai'),
                        href: 'https://www.niubilai.com'
                    }, {
                        text: this.$t('footer.dubiwang'),
                        href: 'http://www.dubiwang.com'
                    }, {
                        text: this.$t('footer.cryptogladiator'),
                        href: 'http://cryptogladiator.io'
                    }, {
                        text: this.$t('footer.alchemint'),
                        href: 'http://alchemint.io'
                    }, {
                        text: this.$t('footer.jgy'),
                        href: 'http://www.jgy.com'
                    }, {
                        text: this.$t('footer.loopring'),
                        href: 'http://loopring.org'
                    }, {
                        text: this.$t('footer.binance'),
                        href: 'http://www.binance.com'
                    }, {
                        text: this.$t('footer.byb'),
                        href: 'http://www.byb.world'
                    }, {
                        text: this.$t('footer.nns'),
                        href: 'https://neons.name'
                    }, {
                        text: this.$t('footer.zdpvt'),
                        href: 'https://www.zdpvt.com/'
                    }, {
                        text: this.$t('footer.DBC'),
                        href: 'https://www.deepbrainchain.org/'
                    }, {
                        text: this.$t('footer.chainfor'),
                        href: 'https://www.chainfor.com/'
                    }, {
                        text: this.$t('footer.bixiaobai'),
                        href: 'http://www.bixiaobai.com/'
                    }, {
                        text: this.$t('footer.biyiye'),
                        href: 'http://biyiye.com/'
                    }, {
                        text: this.$t('footer.odaily'),
                        href: 'https://www.odaily.com'
                    }, {
                        text: this.$t('footer.ihuoqiu'),
                        href: 'http://www.ihuoqiu.com'
                    }, {
                        text: this.$t('footer.blockchainho'),
                        href: 'http://www.blockchainho.me/'
                    }, {
                        text: this.$t('footer.BlockCC'),
                        href: 'http://biyiye.com/'
                    }, {
                        text: this.$t('footer.WLZJ'),
                        href: 'http://www.wanlianzhijia.com'
                    }, {
                        text: this.$t('footer.bitansuo'),
                        href: 'http://www.bitansuo.com'
                    }, {
                        text: this.$t('footer.lianshijie'),
                        href: 'http://www.7234.cn'
                    }, {
                        text: this.$t('footer.qukuainews'),
                        href: 'http://www.qukuainews.com'
                    }, {
                        text: this.$t('footer.blockcircles'),
                        href: 'http://www.blockcircles.cn'
                    }, {
                        text: this.$t('footer.BTCSOS'),
                        href: 'http://BTCsos.com'
                    }, {
                        text: this.$t('footer.hunxu'),
                        href: 'https://www.hunxu.cn'
                    }, {
                        text: this.$t('footer.bitool'),
                        href: 'https://www.bitool.cn'
                    }, {
                        text: this.$t('footer.tokenpapa'),
                        href: 'http://www.tokenpapa.com'
                    }, {
                        text: this.$t('footer.doubi'),
                        href: 'http://doubi.com'
                    }, {
                        text: this.$t('footer._77zhijia'),
                        href: 'http://www.77zhijia.com'
                    }, {
                        text: this.$t('footer.BEE360'),
                        href: 'https://bee360.io'
                    }, {
                        text: this.$t('footer.btc112'),
                        href: 'http://www.btc112.com'
                    }, {
                        text: this.$t('footer.bitjia'),
                        href: 'http://www.bitjia.com'
                    }, {
                        text: this.$t('footer._178bit'),
                        href: 'http://www.178bit.com'
                    }, {
                        text: this.$t('footer.btc126'),
                        href: 'http://www.btc126.com'
                    }, {
                        text: this.$t('footer.btc789'),
                        href: 'http://www.btc789.com'
                    }, {
                        text: this.$t('footer.qklyz'),
                        href: 'http://www.qklyz.com'
                    }, {
                        text: this.$t('footer.bishequ'),
                        href: 'http://bishequ.com'
                    }, {
                        text: this.$t('footer.blockisx'),
                        href: 'http://www.blockisx.com'
                    }, {
                        text: this.$t('footer.gameyjy'),
                        href: 'http://gameyjy.com'
                    }, {
                        text: this.$t('footer.qukuailiant'),
                        href: 'http://qukuailiant.com/'
                    }, {
                        text: this.$t('footer.biiquan'),
                        href: 'http://www.biiquan.com/'
                    }, {
                        text: this.$t('footer.qzcj'),
                        href: 'http://www.qzcj.top/'
                    }, {
                        text: this.$t('footer.o_link'),
                        href: 'http://www.o-o-o.link'
                    }, {
                        text: this.$t('footer.tokenlab'),
                        href: 'http://tokenlab.online'
                    }, {
                        text: this.$t('footer.bjiebtc'),
                        href: 'http://bjiebtc.com'
                    }, {
                        text: this.$t('footer._528btc'),
                        href: 'http://www.528btc.com'
                    }, {
                        text: this.$t('footer.taobi'),
                        href: 'http://www.taobi.ink'
                    }, {
                        text: this.$t('footer.lechain'),
                        href: 'http://www.lechain.com'
                    }, {
                        text: this.$t('footer.dayqkl'),
                        href: 'http://www.dayqkl.com'
                    }, {
                        text: this.$t('footer.hellobtc'),
                        href: 'http://www.hellobtc.com'
                    }, {
                        text: this.$t('footer.block123'),
                        href: 'http://www.block123.com'
                    }, {
                        text: this.$t('footer.BCfans'),
                        href: 'http://www.bcfans.com'
                    }, {
                        text: this.$t('footer.qqbite'),
                        href: 'http://www.qqbite.com'
                    }, {
                        text: this.$t('footer.btsabc'),
                        href: 'http://btsabc.org'
                    }, {
                        text: this.$t('footer.jingyublock'),
                        href: 'http://www.jingyublock.com'
                    }, {
                        text: this.$t('footer.tanuonline'),
                        href: 'http://www.tanuonline.com'
                    }, {
                        text: this.$t('footer.bitbee24'),
                        href: 'http://www.bitbee24.com'
                    }, {
                        text: this.$t('footer.chaindaily'),
                        href: 'http://chaindaily.com'
                    }, {
                        text: this.$t('footer.btc120'),
                        href: 'http://www.120btc.com'
                    }, {
                        text: this.$t('footer.chainpow'),
                        href: 'http://www.chainpow.com'
                    }, {
                        text: this.$t('footer.queding'),
                        href: 'http://www.queding.cn'
                    }, {
                        text: this.$t('footer.qianba'),
                        href: 'http://www.qianba.com'
                    }, {
                        text: this.$t('footer.xiha'),
                        href: 'http://www.xiha.top'
                    }, {
                        text: this.$t('footer.worldb'),
                        href: 'http://worldb.pro'
                    }, {
                        text: this.$t('footer.qkl100'),
                        href: 'http://www.100qkl.com'
                    }, {
                        text: this.$t('footer.sootoo'),
                        href: 'http://vt.sootoo.com'
                    }, {
                        text: this.$t('footer.hibtc'),
                        href: 'https://www.hibtc.org'
                    }, {
                        text: this.$t('footer.bitol'),
                        href: 'http://www.bitol.net'
                    }, {
                        text: this.$t('footer.ttbite'),
                        href: 'http://www.ttbite.com'
                    }, {
                        text: this.$t('footer.finacerun'),
                        href: 'http://www.finacerun.com'
                    }, {
                        text: this.$t('footer.liansiling'),
                        href: 'http://liansiling.com'
                    }, {
                        text: this.$t('footer.bitnews'),
                        href: 'http://www.bitnews.vip'
                    }, {
                        text: this.$t('footer.bikeji'),
                        href: 'http://www.bikeji.com'
                    }, {
                        text: this.$t('footer.shenliancaijing'),
                        href: 'http://www.shenliancaijing.com'
                    }, {
                        text: this.$t('footer.blockob'),
                        href: 'http://www.blockob.com'
                    }, {
                        text: this.$t('footer.bcsky'),
                        href: 'http://bcsky.pro'
                    }, {
                        text: this.$t('footer.ok35'),
                        href: 'http://www.ok35.com'
                    }, {
                        text: this.$t('footer.zxbcc'),
                        href: 'http://www.zxbcc.com'
                    }, {
                        text: this.$t('footer.tuoluocaijing'),
                        href: 'https://www.tuoluocaijing.cn/'
                    }, {
                        text: this.$t('footer.qkl123'),
                        href: 'https://www.qkl123.com/'
                    }, {
                        text: this.$t('footer.dappOnline'),
                        href: 'http://dapponline.io/'
                    }, ],
                contacts: [
                    {
                        href: 'https://github.com/OTCGO/state-browser',
                        title: 'noreferrer noopener',
                        src: require('../assets/images/Github.svg')
                    },
                    {
                        href:
                            '//shang.qq.com/wpa/qunwpa?idkey=1c63793c5fc8adaf4d6c5c9ee782c1ce8fb14dee9494d69a7372efc5415988d6',
                        title: 'qq',
                        src: require('../assets/images/QQ.svg')
                    },
                    {
                        href: 'javascript:;',
                        title: 'wx',
                        src: require('../assets/images/wx.svg')
                    },
                    {
                        href: '//t.me/otcgo',
                        title: 'telegram',
                        src: require('../assets/images/Telegram.svg')
                    },
                    {
                        href: 'https://twitter.com/smart_exchangea',
                        title: 'Twitter',
                        src: require('../assets/images/Twitter.svg')
                    }
                ]
            };
        },
        methods: {
            goTop () {
                scrollTo(0, 0);
            },
            selectNetwork () {
                if (this.network === 'TestNet') {
                    localStorage.setItem('network', 'MainNet');
                } else {
                    localStorage.setItem('network', 'TestNet');
                }
                location.reload();
            }
        }
    };
</script>
