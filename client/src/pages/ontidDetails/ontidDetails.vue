<template>
    <div class="container">
        <h3>ONT ID {{$t('ontId.detail')}}</h3>
        <b-container>
            <b-row>
                <b-col class="break-all">ONT ID:{{ontid}}</b-col>
            </b-row>
            <b-row class="description">
                <b-col class="item first">
                    <h2>Type</h2>
                    <span>{{ddo.Owners[0].Type}}</span>
                </b-col>
                <b-col class="item">
                    <h2>Curve</h2>
                    <span>{{ddo.Owners[0].Curve}}</span>
                </b-col>

            </b-row>
            <b-row class="description">
                <b-col cols="12" class="item first">
                    <h2>Value</h2>
                    <span class="break-all">{{ddo.Owners[0].Value}}</span>
                </b-col>
                <b-col cols="12" class="item first">
                    <h2>PublicKeyId</h2>
                    <span class="break-all">{{ddo.Owners[0].PubKeyId}}</span>
                </b-col>
            </b-row>
        </b-container>

        <div class="row">
            <h3>{{$t('ontId.event')}}</h3>
            <div class="table-content">
                <b-table class="tran-list" :fields="fields" :items="items">
                    <template slot="tx_hash" slot-scope="data">
                        <router-link class="text-color" :to="'/translate-details/'+data.value">{{data.value | shortHash}}</router-link>
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

    export default {
        name: 'ontidDetails',
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
