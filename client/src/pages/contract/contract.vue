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
</style>
<style>
    .ont-contract-list.table-hover tbody tr:hover{
        color:#fff
    }
</style>
<template>
    <div class="blockIndex container">
        <h2 class="text-center ont-page-title">{{$t('contract.name')}}</h2>
        <div class="table-content">
            <b-table class="ont-contract-list" hover @row-clicked="contractClick" :fields="fields" :items="items">
                <template slot="Logo" slot-scope="data">
                    <img class="contract-logo" :src="data.value" alt="">
                </template>
                <template slot="Name" slot-scope="data">
                    <h3 class="contract-name">{{data.value.Name}}</h3>
                    <div class="contract-desc">{{data.value.desc}}</div>
                </template>
                <template slot="ContractHash" slot-scope="data">
                    <span class="text-color">{{data.value | shortHash}}</span>
                </template>
                <template slot="CreateTime" slot-scope="data">{{data.value | formatDate}}</template>
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
    export default {
        data() {
            return {
                items: [],
                total: 0,
                currentPage: 1,
                perPage: 15
            };
        },
        computed: {
            fields() {
                return [
                    {
                        key: "Logo",
                        label: ""
                    },{
                        key: "Name",
                        label: "合约名称",
                        formatter:(value,key,item)=>{
                            return {Name:value,desc:item.Description}
                        }
                    },
                    {
                        key: "ContractHash",
                        label: "合约哈希"
                    },
                    {
                        key: "TxCount",
                        label: "交易数"
                    },
                    {
                        key: "CreateTime",
                        label: "时间"
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
                    this.items = result.ContractList;
                    if (!pagenumber) {
                        this.total = result.Total;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            contractClick(item){
                this.$router.push(`/contract-details/${item.ContractHash}`)
            }
        }
    };
</script>
