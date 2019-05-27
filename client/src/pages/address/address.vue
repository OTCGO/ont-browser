<template>
  <div class="container">
    <b-container>
      <b-row>
        <b-col>{{address}}</b-col>
      </b-row>

      <b-row class="description">
        <b-col class="item col-3" v-for="item in assetBalance" :key="item.index">
          <div v-if="item.AssetName === 'waitboundong'">
            <h2>ong-待提取</h2>
            <span class="text-color">{{item.Balance}}</span>
          </div>
          <div v-else-if="item.AssetName === 'unboundong'">
            <h2>ong-未提取</h2>
            <span class="text-color">{{item.Balance}}</span>
          </div>
          <div v-else>
            <h2>{{item.AssetName}}</h2>
            <span class="text-color">{{item.Balance}}</span>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <div>
      <b-table class="tran-list" :fields="fields" :items="txnList">
        <template slot="Height" slot-scope="data">
          <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
        </template>
        <template slot="TxnHash" slot-scope="data">
          <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
        </template>
        <template slot="TxnTime" slot-scope="data">{{data.value | formatDate}}</template>
      </b-table>
      <b-pagination
        align="center"
        :total-rows="total"
        v-model="currentPage"
        limit="1"
        :per-page="perPage"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import { getAddressInfo } from "@/apis/server/index";
import { utils } from "@/helpers";
export default {
  data() {
    return {
      txnList: [],
      assetBalance: [],
      total: 150,
      currentPage: 1,
      perPage: 15
    };
  },
  mounted() {
    this.getAddressInfo();
  },
  computed: {
    fields() {
      return [
        {
          key: "TxnHash",
          label: `哈希`
        },
        {
          key: "Height",
          label: "高度"
        },
        {
          key: "ConfirmFlag",
          label: "状态"
        },
        {
          key: "TxnTime",
          label: "时间"
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
        this.getAddressInfo(this.perPage, value);
      }
    }
  },
  methods: {
    async getAddressInfo(pagesize, pagenumber) {
      // const address = this.$route.params.address;
      const result = await getAddressInfo(
        this.address,
        pagesize || this.perPage,
        pagenumber || this.currentPage
      );
      if (!pagenumber) {
        this.assetBalance = utils.balanceGtZero(result.AssetBalance);
        // this.assetBalance = result.AssetBalance;
        // console.log("assetBalance", this.assetBalance);
      }

      this.txnList = result.TxnList;

      // console.log("total", this.total);
    }
  }
};
</script>

<style lang="less" scoped>
@import "address.less";
</style>
