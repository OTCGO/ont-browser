<template>
    <div class="container">
        <b-container>
            <h3>{{$t('transaction.name')}}</h3>
            <b-row>
                <b-col class="break-all">Hash:{{hash}}</b-col>
            </b-row>

            <b-row class="description">
                <b-col sm="6" cols="4" style="padding: 0">
                    <div class="item first" style="padding-left: 15px">
                        <h2>{{$t('height')}}</h2>
                         <router-link class="text-color" :to="'/block-details/'+txDetails.block_height">
                            <span class="text-color">{{txDetails.block_height}}</span>
                         </router-link>
                    </div>
                </b-col>
                <b-col sm="6" cols="4" style="padding: 0">
                    <div class="item" style="padding-left: 15px"><h2>
                        {{$t('transaction.type')}}</h2>
                        <span>{{$t(txDetails.tx_type)}}</span>
                    </div>
                </b-col>
                <b-col sm="12" cols="4" style="padding: 0">
                    <div class="item" style="padding-left: 15px"><h2>{{$t('time')}}</h2>
                        <span>{{txDetails.tx_time | formatDate }}</span>
                    </div>
                </b-col>
            </b-row>
            <b-row class="description">
                <b-col class="item first">
                    <h2>{{$t('transaction.fee')}}</h2>
                    <span>{{parseFloat(txDetails.fee)}}</span>
                </b-col>
                <b-col class="item">
                    <h2>{{$t('status')}}</h2>
                    <span>{{confirm_flag}}</span>
                </b-col>
            </b-row>
        </b-container>
        <div v-if="transferList.length">
            <div class="table-content">
                <b-table class="tran-list" :fields="fields" :items="transferList">
                    <template slot="asset_name" slot-scope="data">
                        <div>
                            {{data.value.toUpperCase()}}
                        </div>
                    </template>
                    <template slot="from_address" slot-scope="data">
                        <router-link class="text-color" :to="'/address-details/'+data.value">
                            {{data.value | shortHash}}
                        </router-link>
                    </template>
                    <template slot="to_address" slot-scope="data">
                        <router-link class="text-color" :to="'/address-details/'+data.value">
                            {{data.value | shortHash}}
                        </router-link>
                    </template>
                    <template slot="amount" slot-scope="data">
                        <div>
                            {{parseFloat(data.value)}}
                        </div>
                    </template>
                </b-table>
            </div>

        </div>

        <div v-if="ontId.length">
            <div class="table-content">
                <b-table class="onid-list" :fields="fieldsOntId" :items="ontId">
                    <template slot="ontid" slot-scope="data">
                        <router-link class="text-color" :to="'/ontid-details/'+data.value">{{data.value | shortHash}}
                        </router-link>
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>
<script>

    import {getTransactionByHash} from '@/apis/server/index';
    import {confirmFlagType} from '@/confirmFlagType/index';

    export default {
        name:'translateDetails',
        data () {
            return {
                txDetails: {},
                transferList: [],
                ontId: []
            };
        },
        mounted () {
            console.log(confirmFlagType);
            this.getTransactionByHash();
        },
        computed: {
            fields () {
                return [
                    {
                        key: 'asset_name',
                        label: this.$t('transaction.assets')
                    },
                    {
                        key: 'from_address',
                        label: this.$t('transaction.sentFrom')
                    },
                    {
                        key: 'to_address',
                        label: this.$t('transaction.sentTo')
                    },
                    {
                        key: 'amount',
                        label: this.$t('transaction.amount')
                    },
                    {
                        key: 'description',
                        label: this.$t('transaction.description')
                    }
                ];
            },
            fieldsOntId () {
                return [
                    {
                        key: 'ontid',
                        label: 'ONT ID'
                    },
                    {
                        key: 'description',
                        label: this.$('transaction.desc')
                    }
                ];
            },
            hash () {
                return this.$route.params.hash;
            },
            confirm_flag () {
                return this.$t(confirmFlagType[this.txDetails.confirm_flag]);
            }
        },
        methods: {
            async getTransactionByHash () {
                const result = await getTransactionByHash(this.hash);
                this.txDetails = result;
                if (result.description.indexOf('ontId') >= 0) {
                    return (this.OntId = result.detail.OntId ? [result.detail] : []);
                }

                if (result.description === 'transfer') {
                    return (this.transferList = result.detail.transfers);
                }
                // switch(result.Description){
                //   case :
                // }
                // this.txDetails = result;
                // this.OntId = result.Detail.OntId ? [result.Detail] : [];
                // console.log("this.OntId", this.OntId);
            }
        },
        watch: {
            $route () {
                this.getTransactionByHash();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "translateDetails.less";
</style>
