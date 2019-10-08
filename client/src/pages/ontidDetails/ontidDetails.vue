<template>
    <div class="container">
        <page-header :title="'ONT ID'+ $t('ontId.detail')">
            <span slot>
                ONT ID | {{ontid}}
                <copy :val="ontid"></copy>
            </span>
        </page-header>
        <b-container>
            <b-row class="description">
                <b-col lg="4" md="4" sm="12" style="padding: 0">
                    <div  class="item first">
                        <h2>Type</h2>
                        <span>{{ddo.Owners[0].Type}}</span>
                    </div>
                </b-col>
                <b-col lg="8" md="8" sm="12" style="padding: 0;">
                    <div class="item">
                        <h2>Value</h2>
                        <span class="break-all">{{ddo.Owners[0].Value}}</span>
                    </div>
            </b-col>
            </b-row>
            <b-row class="description">
                <b-col lg="4" md="4" sm="12" style="padding: 0">
                    <div class="item first">
                        <h2>Curve</h2>
                        <span>{{ddo.Owners[0].Curve}}</span>
                    </div>
                </b-col>
                <b-col ls="8" md="8" sm="12" style="padding: 0">
                    <div class="item">
                        <h2>PublicKeyId</h2>
                        <span class="break-all">{{ddo.Owners[0].PubKeyId}}</span>
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <div class="row">
            <h3>{{$t('ontId.event')}}</h3>
            <div class="table-content">
                <b-table class="tran-list" :fields="fields" :items="items">
                    <template slot="tx_hash" slot-scope="data">
                        <router-link class="text-color" :to="'/translate-details/'+data.value">{{data.value | shortHash}}</router-link>
                    </template>
                    <template slot="block_height" slot-scope="data">
                        <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
                    </template>
                    <template slot="tx_time" slot-scope="data">{{data.value | formatDate}}</template>
                </b-table>
            </div>
        </div>
        <b-row class="justify-content-center">
            <b-col md="8" sm="12">
                <b-pagination align="fill" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import {getOntId, getOntIdEvents} from '@/apis/server/index';
    import pageHeader from '@/components/pageHeader/pageHeader.vue'
    export default {
        name: 'ontidDetails',
        components:{
            pageHeader
        },
        data () {
            return {
                items: [],
                ddo: {
                    Owners: [
                        {
                            Type: '',
                            Curve: '',
                            Value: '',
                            PublicKeyId: ''
                        }
                    ]
                },
                total: 0,
                currentPage: 1,
                perPage: 15
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
                        key: 'ontid',
                        label: 'ONT ID'
                    },
                    {
                        key: 'block_height',
                        label: this.$t('height')
                    },
                    {
                        key: 'description',
                        label: this.$t('ontId.desc')
                    },
                    {
                        key: 'tx_time',
                        label: this.$t('time')
                    }
                ];
            },
            ontid () {
                return this.$route.params.id;
            }
        },
        mounted () {
            this.getOntId();
            this.getOntIdEventList();
        },
        methods: {
            async getOntId () {
                try {
                    this.ddo = await getOntId(this.ontid);
                } catch (error) {
                    console.log(error);
                }
            },
            async getOntIdEventList () {
                try {
                    const result = await getOntIdEvents(this.ontid, this.perPage, this.currentPage);
                    this.items = result.records;
                    this.total=result.total
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "ontidDetails.less";
</style>
