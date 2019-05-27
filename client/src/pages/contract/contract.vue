<style scoped lang="less">
@import "contract.less";
</style>
<style lang="less">
.contract-tab .nav-link{
    color:#fff
}
</style>
<template>
    <div class="container">
        <b-container>
            <b-row>
                <b-col>
                    <h4 class="title">合约详情</h4>
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
                    <h2>哈希</h2>
                    <span class="text-color">{{contracthash}}</span>
                </b-col>
                <b-col class="item">
                    <h2>创建者</h2>
                    <span>{{info.creator}}</span>
                </b-col>
                <b-col class="item">
                    <h2>创建时间</h2>
                    <span>{{info.time | formatDate}}</span>
                </b-col>
            </b-row>
            <b-row class="description">
                <b-col class="item first">
                    <h2>Official Website</h2>
                    <span class="text-color">{{info.webSite}}</span>
                </b-col>
                <b-col class="item">
                    <h2>Github</h2>
                    <span>{{info.github}}</span>
                </b-col>
            </b-row>
            <b-row class="description">
                <b-col class="item first">
                    <h2>持币地址</h2>
                    <span class="">{{info.addressNum}}</span>
                </b-col>
                <b-col class="item">
                    <h2>交易数</h2>
                    <span>{{info.total}}</span>
                </b-col>
                <b-col class="item">
                    <h2>流水总量</h2>
                    <div>
                        {{+info.ont}} ONT
                    </div>
                    <div>
                        {{+info.ong}} ONG
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <b-tabs class="contract-tab" content-class="mt-3">
            <b-tab title="交易" active>
                <b-table class="tran-list" :fields="fields" :items="translateList">
                    <template slot="TxnHash" slot-scope="data">
                        <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
                    </template>
                    <template slot="TxnTime" slot-scope="data">{{data.value | formatDate}}</template>
                </b-table>
                <b-row class="justify-content-center">
                    <b-col md="8" sm="12">
                        <b-pagination align="fill" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
                    </b-col></b-row>
            </b-tab>
            <b-tab title="字节代码">
                <textarea name="" cols="30" style="width:100%;" readonly></textarea>
            </b-tab>
            <b-tab title="ABI">
                <textarea name="" cols="30" style="width:100%;" readonly></textarea>
            </b-tab>
            <!--<b-tab title="数据统计">-->

            <!--</b-tab>-->
        </b-tabs>
    </div>
</template>
<script>
    import {
        getContractInfo
    }  from "@/apis/server/index";
    export default {
        data(){
            return {
                perPage:20,
                currentPage:1,
                info:{
                    avatar:'',
                    time:'',
                    name:'',
                    description:'',
                    webSite:'',
                    github:'',
                    addressNum:'',
                    total:'',
                    ont:'',
                    ong:''
                },
                translateList:[],
                total:0
            }
        },
        computed: {
            fields() {
                return [
                    {
                        key: "TxnHash",
                        label: `哈希`
                    },
                    {
                        key: "Fee",
                        label: "费用"
                    },
                    {
                        key: "ConfirmFlag",
                        label: "状态"
                    },{
                        key: "Height",
                        label: "区块"
                    },
                    {
                        key: "TxnTime",
                        label: "时间"
                    }
                ];
            },
            contracthash() {
                return this.$route.params.hash;
            }
        },
        mounted(){
            this.getContract()
        },
        watch:{
            currentPage(){
                this.getContract()
            }
        },
        methods:{
            async getContract(){
                let result = await getContractInfo(this.contracthash,this.perPage,this.currentPage)
                if(result){
                    this.info=Object.assign({
                        avatar:result.Logo,
                        time:result.UpdateTime,
                        name:result.Name,
                        description:result.Description,
                        webSite:JSON.parse(result.ContactInfo)['Official Website'],
                        github:JSON.parse(result.ContactInfo)['Github'],
                        addressNum:result.AddressCount,
                        total:result.Total,
                        ont:result.OntCount,
                        ong:result.OngCount,
                        creator:result.Creator
                    })
                    this.total=result.Total
                    this.translateList=result.TxnList
                }
            },
        }
    };
</script>