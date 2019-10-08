<template>
    <div class="container">
        <page-header :title="$t('block.DetailTitle')">
            <span slot>
                block:{{idx}}
                <copy :val="idx"></copy>
            </span>
        </page-header>
        <b-container>
            <b-row class="description">
                <b-col class="item first">
                    <h2>{{$t('height')}}</h2>
                    <span class="text-color">{{blockDetails.block_height | formatNum}}</span>
                </b-col>
                <b-col class="item">
                    <h2>{{$t('block.transactions')}}</h2>
                    <span>{{blockDetails.tx_count}}</span>
                </b-col>
                <b-col class="item">
                    <h2>{{$t('block.size')}}</h2>
                    <span>{{blockDetails.block_size}} kb</span>
                </b-col>
                <b-col class="item">
                    <h2>{{$t('time')}}</h2>
                    <span>{{blockDetails.block_time | formatDate}}</span>
                </b-col>
            </b-row>
            <b-row class="description">
                <b-col class="item first">
                    <h2>{{$t('block.merkleroot')}}</h2>
                    <span class="break-all">{{blockDetails.txs_root}}</span>
                </b-col>
            </b-row>
        </b-container>
        <div class="list table-content">
            <b-table class="tran-list" :fields="fields" :items="blockDetails.txs">
                <template slot="tx_hash" slot-scope="data">
                    <router-link
                            class="text-color"
                            :to="'/translate-details/'+data.value"
                    >{{data.value | shortHash}}
                    </router-link>
                </template>
                <template slot="confirm_flag" slot-scope="data">{{data.value}}</template>

                <template slot="tx_time" slot-scope="data">{{data.value | formatDate}}</template>
            </b-table>
            <!-- <b-pagination align="center" :total-rows="100" v-model="currentPage" :per-page="10"></b-pagination> -->
        </div>
    </div>
</template>
<script>
    import {getBlockByHeightOrHash} from '@/apis/server/index';
    import {confirmFlagType} from '@/confirmFlagType/index';

    import Copy from '@/components/copy/copy';
    import pageHeader from '@/components/pageHeader/pageHeader.vue';

    export default {
        name: 'blockDetails',
        components: {
            copy: Copy,
            pageHeader
        },
        data () {
            return {
                blockDetails: {}
            };
        },
        mounted () {
            this.getBlockByHeight();
        },
        computed: {
            fields () {
                return [
                    {
                        key: 'tx_hash',
                        label: this.$t('hash')
                    },
                    {
                        key: 'confirm_flag',
                        label: this.$t('status'),
                        formatter: (value, key, item) => {
                            return this.$t(confirmFlagType[value]);
                        }
                    },
                    {
                        key: 'tx_time',
                        label: this.$t('time')
                    }
                ];
            },
            idx () {
                return this.$route.params.idx;
            }
        },
        methods: {
            async getBlockByHeight () {
                // const idx = this.$route.params.idx;
                this.blockDetails = await getBlockByHeightOrHash(this.idx);
            }
        },
        watch: {
            $route (to, from) {
//      this.getBlockByHeight();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "blockDetails.less";
</style>
