<template>
  <div class="container">
    <b-container>
      <b-row>
        <b-col>
          {{tokenDetails.Name}}
          <br>
          {{tokenDetails.Description}}
        </b-col>
      </b-row>

      <b-row class="description">
        <b-col class="item first">
          <h2>哈希</h2>
          <span class="text-color">6c80f3a5c183edee7693a038ca8c476fb0d6ac91</span>
        </b-col>
        <b-col class="item">
          <h2>交易数</h2>
          <span>{{tokenDetails.Total}}</span>
        </b-col>
        <b-col class="item">
          <h2>地址数</h2>
          <span>{{tokenDetails.AddressCount}}</span>
        </b-col>
      </b-row>
      <b-row class="description">
        <b-col class="item first">
          <h2>时间</h2>
          <span>{{tokenDetails.CreateTime | formatDate }}</span>
        </b-col>
        <b-col class="item">
          <h2>符号</h2>
          <span>{{tokenDetails.Symbol }}</span>
        </b-col>
        <b-col class="item">
          <h2>总量</h2>
          <span>{{tokenDetails.TotalSupply}}</span>
        </b-col>
      </b-row>
    </b-container>

    <div>
      <b-table class="tran-list" :fields="fields" :items="tokenDetails.TxnList">
        <template slot="TxnHash" slot-scope="data">
          <router-link class="text-color" :to="'/translate-details/'+data.value">{{data.value}}</router-link>
        </template>
        <template slot="Height" slot-scope="data">
          <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
        </template>
      </b-table>
      <b-row class="justify-content-center">
        <b-col md="8" sm="12">
          <b-pagination align="fill" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { getToken } from "@/apis/server/index";
export default {
  data() {
    return {
      tokenDetails: {},
      total: 0,
      currentPage: 1,
      perPage: 15
    };
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
    }
  },
  mounted() {
    this.getToken();
  },
  watch: {
    currentPage: {
      handler: function(value) {
        this.getToken(this.perPage, value);
      }
    },
    $route() {
      this.getTokem(this.perPage, this.currentPage);
    }
  },
  methods: {
    async getToken(pagesize, pagenumber) {
      let hash = this.$route.params.hash;
      let type = this.$route.params.type;
      const result = await getToken(
        type,
        hash,
        pagesize || this.perPage,
        pagenumber || this.currentPage
      );
      this.tokenDetails = result;
      if (!pagenumber) {
        this.total = result.Total;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "tokenDetails.less";
</style>
