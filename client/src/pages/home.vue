<style scoped lang="less">
    .head {
        width: 100%;
        display: flex;
        padding: 2rem 0;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        h2 {
            font-size: 2rem;
            color: #fff;
        }
        .logo {
            width: 20rem;
            margin-bottom: 2rem;
        }
        .search-group {
            margin: 2rem 0;
        }
        .search-btn {
            padding: 0 2rem;
        }
    }

    .ont-dynamic-list {
        margin: 0 auto;
        .ont-dynamic-item {
            position: relative;
            padding: 15px;

            .ont-dynamic-link {
                cursor: pointer;
            }
            .ont-dynamic-content {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #fff;
                z-index: 1;
                padding: 15px 0;
                p {
                    margin: 0;
                    line-height: 1.5;
                }
                .ont-dynamic-title {
                    font-size: 1rem;
                    margin-top: .5rem;
                }
                .ont-dynamic-value {
                    font-size: 1.6rem;
                }
            }
        }
    }

    .ont-bg {
        position: absolute;
        top: 15px;
        left: 15px;
        bottom: 15px;
        right: 15px;
        background: #308fd8;
        opacity: 0.4;
    }

    /*  .ont-dynamic-link:hover .ont-dynamic-content {
          color: #0056b3 !important;
      }*/

    .ont-block-list {
        padding: 15px;
        color: #fff;
    }

    .title-color {
        z-index: 1;
        line-height: 3;
        align-items: center;
        color: #fff;
        &:hover {
            color: #0056b3;
        }
    }

    .ont-block-item {
        padding: 0;
        margin: 0;
        border-top: 1px solid #fff;
        z-index: 1;
        .ont-block-content {
            padding: 10px 0;
        }
    }

    .ont-item-title {
        font-size: 1.5rem;
    }

    @media (max-width: 576px) {
        .logo {
            display: none;
        }
    }

</style>
<template>
    <div class="el-container">
        <div class="head">
            <img :src="$t('logo')" class="logo" alt>
            <b-row style="width: 100%">
                <b-col md="6" sm="12" offset-md="3">
                    <ont-search size="lg"></ont-search>
                </b-col>
            </b-row>
        </div>
        <div class="row container ont-dynamic-list">
            <!-- <div class="col-md-2 col-lg-2 ont-dynamic-item col-sm-4">
              <div class="ont-bg"></div>
              <div class="ont-dynamic-content">
                <p class="ont-dynamic-title">当前区块高度</p>
                <p class="ont-dynamic-value">2016-08-15</p>
              </div>
            </div>-->
            <router-link to="/translate" class="col-md-2 offset-md-1 ont-dynamic-link ont-dynamic-item col-sm-4">
                <div class="ont-dynamic-content" style="padding: 19px 0 ;">
                    <img src="@/assets/images/translate.png" alt="">
                    <p class="ont-dynamic-title">{{$t('dynamic.transactionNum')}}</p>
                    <p class="ont-dynamic-value">{{summary.tx_count}}</p></div>
            </router-link>
            <a href="https://node.ont.io/" target="_blank" class="col-md-2 ont-dynamic-link ont-dynamic-item col-sm-4">
                <div class="ont-dynamic-content">
                    <img src="@/assets/images/nodes.png" alt="">
                    <p class="ont-dynamic-title">{{$t('dynamic.nodes')}}</p>
                    <p class="ont-dynamic-value">{{summary.node_count}}</p>
                </div>
            </a>
            <router-link to="/block" class="col-md-2  ont-dynamic-item ont-dynamic-link col-sm-4">
                <div class="ont-dynamic-content">
                    <img src="@/assets/images/height.png" alt="">
                    <p class="ont-dynamic-title">{{$t('dynamic.blockHeight')}}</p>
                    <p class="ont-dynamic-value">{{summary.block_height}}</p>
                </div>
            </router-link>
            <router-link to="/ontid" class="col-md-2 ont-dynamic-item ont-dynamic-link col-sm-4">
                <div class="ont-dynamic-content">
                    <img src="@/assets/images/ontId.png" alt="">
                    <p class="ont-dynamic-title">{{$t('dynamic.ontIdNum')}}</p>
                    <p class="ont-dynamic-value">{{summary.ontid_count}}</p>
                </div>
            </router-link>
            <router-link to="/address/ont" class="col-md-2 ont-dynamic-item ont-dynamic-link col-sm-4">
                <div class="ont-dynamic-content">
                    <img src="@/assets/images/address.png" alt="">
                    <p class="ont-dynamic-title">{{$t('dynamic.addressNum')}}</p>
                    <p class="ont-dynamic-value">{{summary.address_count}}</p>
                </div>
            </router-link>
            <!-- <router-link to="/" class="col-md-2 ont-dynamic-item ont-dynamic-link col-sm-4">
              <div class="ont-bg"></div>
              <div class="ont-dynamic-content">
                <p class="ont-dynamic-title">{{$t('dynamic.addressNum')}}</p>
                <p class="ont-dynamic-value">2016-08-15</p>
              </div>
            </router-link>
            <router-link to="/" class="col-md-2 ont-dynamic-item ont-dynamic-link col-sm-4">
              <div class="ont-bg"></div>
              <div class="ont-dynamic-content">
                <p class="ont-dynamic-title">{{$t('dynamic.newBlock')}}</p>
                <p class="ont-dynamic-value">09{{$t('dynamic.second')}}</p>
              </div>
            </router-link>-->
        </div>
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="ont-block-list">
                        <div class="ont-bg"></div>
                        <router-link to="/block" class=" title-color">
                            <b-row>
                                <b-col cols="8">{{$t('slider.block.name')}}</b-col>
                                <b-col cols="4">
                                    <div class="title-more text-right">>></div>
                                </b-col>
                            </b-row>
                        </router-link>
                        <div class="row ont-block-item" v-for="item in block" :key="item.Height">
                            <div class="col-sm-12 ont-block-content">
                                <div class="row" style="align-items: center">
                                    <router-link
                                            :to="'/block-details/'+item.block_height"
                                            class="col-6 text-left pointer text-color "
                                    >{{item.block_height}}
                                    </router-link>
                                    <div class="col-6 text-right">{{item.tx_count}} Transaction</div>
                                </div>
                                <div class="row block-item-sub-wrapper">
                                    <span class="block-item col-6 text-left">{{item.block_size}} byte</span>
                                    <span class="block-item col-6 text-right">{{item.block_time | formatDate}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="ont-block-list">
                        <div class="ont-bg"></div>
                        <router-link to="/translate" class="row title-color">
                            <div class="col-8">{{$t('slider.transaction.name')}}</div>
                            <div class="col-4">
                                <div class="title-more text-right">>></div>
                            </div>
                        </router-link>
                        <div class="row ont-block-item" v-for="item in transaction" :key="item.index">
                            <div class="col-sm-12 ont-block-content">
                                <div class="row" style="align-items: center">
                                    <router-link
                                            :to="/translate-details/+item.tx_hash"
                                            class="text-hidden text-color col-6 text-left"
                                    >{{item.tx_hash}}
                                    </router-link>
                                    <div class="col-6 text-right">{{item.tx_time | formatDate}}</div>
                                </div>
                                <div class>{{ $t(item.tx_type) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="ont-block-list">
                        <div class="ont-bg"></div>
                        <router-link to="/ontid" class="row title-color">
                            <div class="col-8">{{$t('slider.ontId.name')}}</div>
                            <div class="col-4">
                                <div class="title-more text-right">>></div>
                            </div>
                        </router-link>
                        <div class="row ont-block-item" v-for="item in ontid" :key="item.index">
                            <div class="col-sm-12 ont-block-content">
                                <div class="row" style="align-items: center">
                                    <router-link
                                            :to="'/ontid-details/'+item.ontid"
                                            class="text-hidden text-color col-6 text-left"
                                    >{{item.ontid}}
                                    </router-link>
                                    <div class="col-6 text-right">{{item.tx_time | formatDate}}</div>
                                </div>
                                <div class>{{item.description}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        getSummaryInfo,
        getLatestBlock,
        getLatestTransaction,
        getLatestOntId,
        getOntId,
        getBlockByHeightOrHash,
        getTransactionByHash,
        getContractInfo
    } from '@/apis/server/index';
    import ontSearch from '@/components/ontSearch/ontSearch.vue';

    export default {
        data () {
            return {
                summary: {
                    CurrentHeight: 0,
                    TxnCount: 0,
                    NodeCount: 0,
                    OntIdCount: 0,
                    AddressCount: 0
                },
                block: [],
                transaction: [],
                ontid: [],
                searchKey: '',
                interval: null
            };
        },
        components: {
            ontSearch
        },
        mounted () {
            this.$once('hook:beforeDestroy', () => {
                clearInterval(this.interval);
                this.interval = null;
            });
        },
        methods: {
            init () {
                this.getSummary();
                this.getLastBlock();
                this.getLastTransaction();
                this.getLastOntId();
            },
            async getSummary () {
                try {
                    this.summary = await getSummaryInfo();
                } catch (error) {
                }
            },
            async getLastBlock () {
                try {
                    this.block = await getLatestBlock(3);

                } catch (error) {
                    //console.log('')
                }
            },
            async getLastTransaction () {
                try {
                    this.transaction = await getLatestTransaction(3);
                } catch (error) {
                }
            },
            async getLastOntId () {
                try {
                    this.ontid = await getLatestOntId(3);
                } catch (error) {
                }
            }
        },
        activated () {
            this.init();
            this.interval = setInterval(this.init, 6000);
        },
        deactivated () {
            clearInterval(this.interval);
            this.interval = null;
        },
        beforeDestroy () {
            console.log('beforeDestroy');
            // clearInterval(this.interval);
        }
    };
</script>
