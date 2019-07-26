<style scoped lang="less">
    .ont-page-title {
        font-size: 2.5rem;
        color: #fff;
        margin: 1.5rem 0;
    }

    .ont-block-list {
        color: #fff;
        border-bottom: 1px solid #fff;
    }

    .btn-group {
        .btn {
            padding: 4px 25px;
            font-size: 16px;
            color: #fff;
            margin-bottom: 15px;
            &.btn-current {
                border: 1px solid #fff;
            }
            &.btn-choose {
                color: #e4e4e4;
                border: 1px solid #e4e4e4;
            }
        }
    }
</style>
<template>
    <div class="blockIndex container">
        <h2 class="text-center ont-page-title">{{$t('slider.address.name')}}</h2>
        <div class="btn-group">
            <button type="button" class="btn " @click="toAddressListPage('ont')"
                    :class="token==='ont'?'btn-current':'btn-choose'" :disabled="token==='ont'">ONT
            </button>
            <button type="button" class="btn  " @click="toAddressListPage('ong')"
                    :class="token==='ong'?'btn-current':'btn-choose'" :disabled="token==='ong'">ONG
            </button>
        </div>
        <div class="table-content">
            <table class="table b-table ont-block-list">
                <thead>
                <tr>
                    <th>{{$t('address.rank')}}</th>
                    <th>{{$t('address.value')}}</th>
                    <th>{{(token === 'ont' ? 'ONT ' : 'ONG ') + $t('address.balance')}}</th>
                    <th>{{$t('address.percent')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in items" v-bind:key="index">
                    <td>{{index  + (perPage * (currentPage - 1))+1}}</td>
                    <td>
                        <router-link class="text-color" :to="'/address-details/'+item.address">
                            {{item.address}}
                        </router-link>
                    </td>
                    <td>{{parseFloat(item.balance)}}</td>
                    <td>{{ (item.balance / 1000000000 * 100 ).toFixed(2) + "%"}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-row class="justify-content-center">
            <b-col md="8" sm="12">
                <b-pagination align="fill" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import {getAddressList} from '@/apis/server/index';

    export default {
        data () {
            return {
                token: 'ont',
                items: [],
                total: 0,
                currentPage: 1,
                perPage: 20
            };
        },
        computed: {
            fields () {
                return [
                    {
                        key: 'Height',
                        label: this.$t('block.height')
                    },
                    {
                        key: 'Hash',
                        label: this.$t('hash')
                    },
                    {
                        key: 'TxnNum',
                        label: this.$t('block.transactions')
                    },
                    {
                        key: 'BlockSize',
                        label: this.$t('size')
                    },
                    {
                        key: 'BlockTime',
                        label: this.$t('time')
                    }
                ];
            }
        },
        mounted () {
            this.token = this.$route.params.token
            this.getAddress();
        },
        watch: {
            '$route' () {
                this.token = this.$route.params.token
                this.getAddress()
            },
            currentPage: {
                handler: function (value) {
                    this.currentPage = value;
                    this.getAddress();
                }
            }
        },
        methods: {
            toAddressListPage (token) {
                this.$router.push({
                    name: 'address',
                    params: {token: token}
                });
            },

            async getAddress () {
                try {
                    const result = await getAddressList(
                        this.currentPage,
                        this.perPage,
                        this.token
                    );
                    // if(this.token==='ong'){
                    //     result.map(item=>{
                    //         let balance=item.balance+''
                    //         item.balance = balance.substring(0, balance.length - 9) + '.' + balance.substring(balance.length - 9)
                    //     })

                    // }
                    console.log('result',result);
                    this.items = result.data;
                    this.total = result.total;
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
</script>
