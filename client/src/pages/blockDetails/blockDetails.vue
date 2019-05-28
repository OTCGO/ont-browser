<template>
  <div class="container">
    <b-container>
      <b-row>
        <b-col>
          <h4 class="title">block:{{idx}}</h4>
        </b-col>
      </b-row>

      <b-row class="description">
        <b-col class="item first">
          <h2>高度</h2>
          <span class="text-color">{{blockDetails.Height}}</span>
        </b-col>
        <b-col class="item">
          <h2>交易数</h2>
          <span>{{blockDetails.TxnNum}}</span>
        </b-col>
        <b-col class="item">
          <h2>时间</h2>
          <span>{{blockDetails.BlockTime | formatDate}}</span>
        </b-col>
      </b-row>
      <b-row class="description">
        <b-col class="item first">
          <h2>Merkle根</h2>
          <span class="break-all">{{blockDetails.TxnsRoot}}</span>
        </b-col>
      </b-row>
    </b-container>

    <div class="list table-content">
      <b-table class="tran-list" :fields="fields" :items="blockDetails.TxnList">
        <template slot="TxnHash" slot-scope="data">
          <router-link class="text-color" :to="'/translate-details/'+data.value">{{data.value |shortHash}}</router-link>
        </template>
        <template slot="TxnTime" slot-scope="data">{{data.value | formatDate}}</template>
      </b-table>
      <!-- <b-pagination align="center" :total-rows="100" v-model="currentPage" :per-page="10"></b-pagination> -->
    </div>
  </div>
</template>
<script>
import { getBlockByHeightOrHash } from "@/apis/server/index";

export default {
  data() {
    return {
      blockDetails: {}
    };
  },
  mounted() {
    this.getBlockByHeight();
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
    idx() {
      return this.$route.params.idx;
    }
  },
  methods: {
    async getBlockByHeight() {
      // const idx = this.$route.params.idx;
      this.blockDetails = await getBlockByHeightOrHash(this.idx);
    }
  },
  watch: {
    $route(to, from) {
      this.getBlockByHeight();
    }
  }
};
</script>

<style lang="less" scoped>
@import "blockDetails.less";
</style>
