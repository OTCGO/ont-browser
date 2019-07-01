<template>
    <div class="container">
        <h3>{{$t('address.detailTitle')}}</h3>
        <b-container>
            <b-row>
                <b-col class="break-all">{{$t('address.value')}}:{{address}}</b-col>
            </b-row>

            <b-row class="description">
                <b-col style="padding-right: 0;" class="col-md-3 col-sm-6 col-xs-3" v-for="item in assetBalance"
                       :key="item.index">
                    <div class="item" v-if="item.AssetName === 'waitboundong'">
                        <h2>ONG-{{$t('address.claimable')}}</h2>
                        <span class="text-color">{{item.Balance}}</span>
                    </div>
                    <div class="item" v-else-if="item.AssetName === 'unboundong'">
                        <h2>ONG-{{$t('address.unbound')}}</h2>
                        <span class="text-color">{{item.Balance}}</span>
                    </div>
                    <div class="item" v-else>
                        <h2>{{item.AssetName.toUpperCase()}}</h2>
                        <span class="text-color">{{item.Balance}}</span>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <div class="row">
            <div class="table-content">
                <b-table class="tran-list" :fields="fields" :items="txnList">
                    <template slot="Height" slot-scope="data">
                        <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
                    </template>
                    <template slot="TxnHash" slot-scope="data">
                        <router-link class="text-color" :to="'/translate-details/'+data.value">{{data.value | shortHash}}</router-link>
                    </template>
                    <template slot="TxnTime" slot-scope="data">{{data.value | formatDate}}</template>
                </b-table>
            </div>
        </div>
        <b-row class="justify-content-center">
            <b-col md="8" sm="12">
                <b-pagination
                        align="fill"
                        :total-rows="total"
                        v-model="currentPage"
                        limit="1"
                        :per-page="perPage"
                ></b-pagination>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import {getAddressInfo} from '@/apis/server/index';
    import {utils} from '@/helpers';
    import {confirmFlagType} from '@/confirmFlagType/index';

    export default {
        name:'addressDetails',
        data () {
            return {
                txnList: [],
                assetBalance: [],
                total: 150,
                currentPage: 1,
                perPage: 15
            };
        },
        mounted () {
            this.getAddressInfo();
        },
        computed: {
            fields () {
                return [
                    {
                        key: 'TxnHash',
                        label: this.$t('hash')
                    },
                    {
                        key: 'Height',
                        label: this.$t('height')
                    },
                    {
                        key: 'ConfirmFlag',
                        label: this.$t('status'),
                        formatter: (value, key, item) => {
                            return this.$t(confirmFlagType[value]);
                        }
                    },
                    {
                        key: 'TxnTime',
                        label: this.$t('time')
                    }
                ];
            },
            address () {
                return this.$route.params.address;
            }
        },
        watch: {
            currentPage: {
                handler: function (value) {
                    this.getAddressInfo(this.perPage, value);
                }
            }
        },
        methods: {
            async getAddressInfo (pagesize, pagenumber) {
                // const address = this.$route.params.address;
                const result = await getAddressInfo(
                    this.address,
                    pagesize || this.perPage,
                    pagenumber || this.currentPage
                );
                if (!pagenumber) {
                    this.assetBalance = utils.balanceGtZero(result.AssetBalance);
                    // this.assetBalance = result.AssetBalance;
                    // console.log("assetBalance", this.assetBalance);
                }

                this.txnList = result.TxnList;

                // console.log("total", this.total);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "address.less";
</style>
