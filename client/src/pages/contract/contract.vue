<style scoped lang="less">
    .contract-logo{
        width:32px;
        height:32px;
    }
    .contract-name{
        font-size: 1.2rem;
        font-weight: 600;
    }
    .ont-page-title {
        font-size: 2.5rem;
        color: #fff;
        margin: 1.5rem 0;
    }
    .ont-contract-list {
        color: #fff;
        border-bottom: 1px solid #fff;
    }
    .contract-desc{
        max-width: 45rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
</style>
<style>
    .ont-contract-list.table-hover tbody tr:hover{
        color:#fff
    }
</style>
<template>
    <div class="blockIndex container">
        <page-header :title="$t('contract.title')">
            <span slot>
                {{$t('contract.total')}} | {{total|formatNum}}
            </span>
        </page-header>
        <div class="table-content">
            <b-table class="ont-contract-list" hover @row-clicked="contractClick" :fields="fields" :items="items">
                <template slot="logo" slot-scope="data">
                    <img class="contract-logo" :src="data.value" alt="">
                </template>
                <template slot="name" slot-scope="data">
                    <h3 class="contract-name">{{data.value.Name}}</h3>
                    <div class="contract-desc">{{data.value.desc}}</div>
                </template>
                <template slot="contract_hash" slot-scope="data">
                    <span class="text-color">{{data.value | shortHash}}</span>
                </template>
                <template slot="create_time" slot-scope="data">{{data.value | formatDate}}</template>
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
    import { getContracts } from "@/apis/server/index";
    import pageHeader from '@/components/pageHeader/pageHeader'
    export default {
        data() {
            return {
                items: [],
                total: 0,
                currentPage: 1,
                perPage: 15
            };
        },
        components:{
          pageHeader
        },
        computed: {
            fields() {
                return [
                    {
                        key: "logo",
                        label: ""
                    },{
                        key: "name",
                        label: this.$t('contract.name'),
                        formatter:(value,key,item)=>{
                            return {Name:value,desc:item.description}
                        }
                    },
                    {
                        key: "contract_hash",
                        label: this.$t('hash')
                    },
                    {
                        key: "tx_count",
                        label: this.$t('contract.transactions')
                    },
                    {
                        key: "create_time",
                        label: this.$t('contract.createTime')
                    }
                ];
            }
        },
        mounted() {
            this.getContractList();
        },
        watch: {
            currentPage: {
                handler: function(value) {
                    this.getContractList(this.perPage, value);
                }
            }
        },
        methods: {
            async getContractList(pagesize, pagenumber) {
                try {
                    const result = await getContracts(
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
            },
            contractClick(item){
                this.$router.push(`/contract-details/${item.contract_hash}`)
            }
        }
    };
</script>
