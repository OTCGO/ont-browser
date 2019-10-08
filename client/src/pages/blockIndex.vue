<style scoped lang="less">

    .ont-block-list {
        color: #fff;
        /*border-bottom: 1px solid #fff;*/
    }
</style>
<template>
    <div class="blockIndex container">
        <page-header :title="$t('slider.block.name')">
            <span slot>
                当前高度|134
            </span>
        </page-header>
        <div class="table-content">
            <b-table class="ont-block-list" :fields="fields" :items="items">
                <template slot="block_height" slot-scope="data">
                    <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value|formatNum}}</router-link>
                </template>
                <template slot="block_hash" slot-scope="data">
                    <div>{{data.value | shortHash}}</div>
                </template>
                <template slot="tx_count" slot-scope="data">
                    <div v-if="data.value">{{data.value | formatNum}}</div>
                    <div v-else>0</div>
                </template>
                <template slot="block_size" slot-scope="data">
                    <div>{{data.value | formatNum}}</div>
                </template>
                <template slot="block_time" slot-scope="data">{{data.value | formatDate}}</template>
            </b-table>
        </div>
        <b-row class="justify-content-center">
            <b-col md="8" sm="12">
                <b-pagination align="fill" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import {getBlockList} from '@/apis/server/index';
    import pageHeader from '@/components/pageHeader/pageHeader.vue';
    export default {
        data () {
            return {
                items: [],
                total: 0,
                currentPage: 1,
                perPage: 15
            };
        },
        components: {
            pageHeader
        },
        computed: {
            fields () {
                return [
                    {
                        key: 'block_height',
                        label: this.$t('block.height')
                    },
                    {
                        key: 'block_hash',
                        label: this.$t('hash')
                    },
                    {
                        key: 'tx_count',
                        label: this.$t('block.transactions')
                    },
                    {
                        key: 'block_size',
                        label: this.$t('size')
                    },
                    {
                        key: 'block_time',
                        label: this.$t('time')
                    }
                ];
            }
        },
        mounted () {
            this.getBlock();
        },
        watch: {
            currentPage: {
                handler: function (value) {
                    this.getBlock(this.perPage, value);
                }
            }
        },
        methods: {
            async getBlock (pagesize, pagenumber) {
                try {
                    const result = await getBlockList(
                        pagesize || this.perPage,
                        pagenumber || this.currentPage
                    );
                    this.items = result.records;
                    if (!pagenumber) {
                        this.total = result.total;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
</script>
