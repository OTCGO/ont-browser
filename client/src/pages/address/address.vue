<template>
  <div class="container">
    <h3>{{$t('address.detailTitle')}}</h3>
    <b-container>
      <b-row>
        <b-col class="break-all">
          {{$t('address.value')}}:{{address}}
          <copy :val="address"></copy>
        </b-col>
      </b-row>

      <b-row class="description">
        <b-col
          style="padding-right: 0;"
          class="col-md-3 col-sm-6 col-xs-3"
          v-for="item in nativeBalance"
          :key="item.index"
        >
          <div class="item" v-if="item.asset_name === 'waitboundong'">
            <h2>ONG-{{$t('address.claimable')}}</h2>
            <span class="text-color">{{item.balance}}</span>
          </div>
          <div class="item" v-else-if="item.asset_name === 'unboundong'">
            <h2>ONG-{{$t('address.unbound')}}</h2>
            <span class="text-color">{{item.balance}}</span>
          </div>
          <div class="item" v-else>
            <h2>{{item.asset_name.toUpperCase()}}</h2>
            <span class="text-color">{{item.balance}}</span>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div class="row">
      <div class="table-content">
        <b-table class="tran-list" :fields="fields" :items="txnList">
          <template slot="block_height" slot-scope="data">
            <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
          </template>
          <template slot="tx_hash" slot-scope="data">
            <router-link
              class="text-color"
              :to="'/translate-details/'+data.value"
            >{{data.value | shortHash}}</router-link>
          </template>
          <template slot="tx_time" slot-scope="data">{{data.value | formatDate}}</template>
        </b-table>
      </div>
    </div>
    <b-row class="justify-content-center">
      <b-col md="8" sm="12">
        <b-pagination
          align="fill"
          :total-rows="total"
          v-model="currentPage"
          limit="3"
          :per-page="perPage"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { getTransactions, getAddressBalances } from "@/apis/server/index";
import { utils } from "@/helpers";
import { confirmFlagType } from "@/confirmFlagType/index";
import Copy from "@/components/copy/copy";
import {
    formatNum
} from '@/filters';

export default {
  name: "addressDetails",
  components: {
    copy: Copy
  },
  data() {
    return {
      txnList: [],
      nativeBalance: [],
      total: 0,
      currentPage: 1,
      perPage: 15
    };
  },
  mounted() {
    // this.getAddressInfo();
    this.getAddressBalances();
    this.getTransactions();
  },
  computed: {
    fields() {
      return [
        {
          key: "tx_hash",
          label: this.$t("hash")
        },
        {
          key: "amount",
          label: this.$t("transaction.amount"),
          formatter:(_,key,item)=>{
              // console.log('item',item)
              const result = item.transfers.map(value =>{
                if(value.from_address === this.address){
                      return '- ' + formatNum(value.amount) + ' ' +value.asset_name.toUpperCase()
                }

                 return formatNum(value.amount) + ' ' +value.asset_name.toUpperCase()
              })

//              console.log('result',result)
              return result.join(" | ")
              // return item.transfers[0].amount || 0
              // item.forEach(element => {
              //   return
              // });
          }

        },
        {
          key: "confirm_flag",
          label: this.$t("status"),
          formatter: value => {
            return this.$t(confirmFlagType[value]);
          }
        },
        {
          key: "tx_time",
          label: this.$t("time")
        }
      ];
    },
    address() {
      return this.$route.params.address;
    }
  },
  watch: {
    currentPage: {
      handler: function(value) {
        this.getTransactions(this.perPage, value);
      }
    }
  },
  methods: {
    async getTransactions(pagesize, pagenumber) {
      // const address = this.$route.params.address;
      const result = await getTransactions(
        this.address,
        pagesize || this.perPage,
        pagenumber || this.currentPage
      );
      this.txnList = result.records;
      if (!pagenumber) {
        this.total = result.total;
      }
    },

    async getAddressBalances() {
      try {
        const result = await Promise.all([
          getAddressBalances(this.address, "native"),
          getAddressBalances(this.address, "oep4")
          // getAddressBalances(this.address, "oep5"),
          // getAddressBalances(this.address, "oep8")
        ]);
        // console.log('getAddressBalances',result)

        this.nativeBalance = result[0].concat(result[1]);
      } catch (error) {
        console.log("getAddressBalances,error", error);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "address.less";
</style>
