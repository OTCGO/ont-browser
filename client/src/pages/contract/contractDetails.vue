<style scoped lang="less">
    @import "contractDetails.less";
</style>
<style lang="less">
    .contract-tab .nav-link {
        color: #fff
    }
</style>
<template>
    <div class="container">
        <b-container>
            <b-row>
                <b-col>
                    <h3 class="title">{{$t('contract.detailTitle')}}</h3>
                </b-col>
            </b-row>
            <b-row class="description">
                <b-col class="item first contract-base-info">
                    <img class="avatar" :src="info.avatar" alt="">
                    <div class="info">
                        <h4 class="title">{{info.name}}</h4>
                        <p class="des">{{info.description}}</p>
                    </div>
                </b-col>
            </b-row>
            <b-row class="description">
                <b-col class="item first">
                    <h2>{{$t('hash')}}</h2>
                    <span class="text-color break-all">{{contracthash}}</span>
                </b-col>
                <b-col class="item">
                    <h2>{{$t('contract.creator')}}</h2>
                    <router-link class="text-color" :to="'/address-details/'+info.creator">{{info.creator}}
                    </router-link>
                </b-col>
                <b-col class="item">
                    <h2>{{$t('contract.createTime')}}</h2>
                    <span>{{info.time | formatDate}}</span>
                </b-col>
            </b-row>
            <b-row class="description">
                <b-col class="item first">
                    <h2>Official Website</h2>
                    <a :href="info.webSite" target="_blank" class="text-color break-all">{{info.webSite}}</a>
                </b-col>
                <b-col class="item">
                    <h2>Github</h2>
                    <a :href="info.github" target="_blank" class="break-all text-color">{{info.github}}</a>
                </b-col>
            </b-row>
            <b-row class="description">
                <b-col class="item first">
                    <h2>{{$t('contract.address')}}</h2>
                    <span class="">{{info.address_count}}</span>
                </b-col>
                <b-col class="item">
                    <h2>{{$t('contract.transactions')}}</h2>
                    <span>{{info.tx_count}}</span>
                </b-col>
                <b-col class="item">
                    <h2>{{$t('contract.volume')}}</h2>
                    <div>
                        {{parseFloat(info.ont)}} ONT
                    </div>
                    <div>
                        {{+info.ong}} ONG
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <b-tabs class="contract-tab" content-class="mt-3">
            <b-tab :title="$t('contract.transaction')" active>
                <div class="table-content">
                    <b-table class="tran-list" :fields="fields" :items="translateList">
                        <template slot="tx_hash" slot-scope="data">
                            <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value | shortHash}}</router-link>
                        </template>
                        <template slot="tx_time" slot-scope="data">{{data.value | formatDate}}</template>
                    </b-table>
                </div>
                <b-row class="justify-content-center">
                    <b-col md="8" sm="12">
                        <b-pagination align="fill" :total-rows="total" v-model="currentPage"
                                      :per-page="perPage"></b-pagination>
                    </b-col>
                </b-row>
            </b-tab>
            <b-tab :title="$t('contract.code')">
                <textarea name="" rows="6" style="width:100%;" v-model="info.code" readonly></textarea>
            </b-tab>
            <b-tab title="ABI">
                <textarea name="" rows="6" style="width:100%;" v-model="info.abi" readonly></textarea>
            </b-tab>
            <!--<b-tab title="数据统计">-->

            <!--</b-tab>-->
        </b-tabs>
    </div>
</template>
<script>
    import {
        getContractInfo,
        getContractTransactions,
        getContractDaily
    } from '@/apis/server/index';

    export default {
        name: 'contractDetails',
        data () {
            return {
                perPage: 20,
                currentPage: 1,
                info: {
                    avatar: '',
                    time: '',
                    name: '',
                    description: '',
                    webSite: '',
                    github: '',
                    address_count: '',
                    tx_count: '',
                    ont: '',
                    ong: '',
                    code: '',
                    abi: ''
                },
                translateList: [],
                total: 0
            };
        },
        computed: {
            fields () {
                return [
                    {
                        key: 'tx_hash',
                        label: this.$t('hash')
                    },
                    {
                        key: 'fee',
                        label: this.$t('fee'),
                        formatter: (value, key, item) => {
                            return parseFloat(value);
                        }
                    },
                    {
                        key: 'confirm_flag',
                        label: this.$t('status')
                    }, {
                        key: 'block_height',
                        label: this.$t('contract.block')
                    },
                    {
                        key: 'tx_time',
                        label: this.$t('time')
                    }
                ];
            },
            contracthash () {
                return this.$route.params.hash;
            }
        },
        mounted () {
            this.getContract();
            this.getContractTransactions();
        },
        watch: {
            currentPage () {
                this.getContract();
                this.getContractTransactions();
            }
        },
        methods: {
            async getContract () {
                let result = await getContractInfo(this.contracthash);
                if (result) {
                    this.info = Object.assign({
                        avatar: result.logo,
                        time: result.update_time,
                        name: result.name,
                        description: result.description,
                        webSite: JSON.parse(result.contact_info)['Official Website'],
                        github: JSON.parse(result.contact_info)['Github'],
                        address_count: result.address_count,
                        ont: result.ont_sum,
                        ong: result.ong_sum,
                        tx_count: result.tx_count,
                        creator: result.creator,
                        abi: result.abi,
                        code: result.code
                    });
                }
            },
            async getContractTransactions () {
                let result = await getContractTransactions(this.contracthash, this.perPage, this.currentPage);
                this.total = result.total;
                this.translateList = result.records;
            }
        }
    };
</script>