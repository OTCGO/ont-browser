<template>
  <div class="container">
    <h3>{{$t('block.DetailTitle')}}</h3>
    <b-container>
      <b-row>
        <b-col>
          <h4 class="title">block:{{idx}}</h4>
        </b-col>
      </b-row>

      <b-row class="description">
        <b-col class="item first">
          <h2>{{$t('height')}}</h2>
          <span class="text-color">{{blockDetails.Height}}</span>
        </b-col>
        <b-col class="item">
          <h2>{{$t('block.transactions')}}</h2>
          <span>{{blockDetails.TxnNum}}</span>
        </b-col>
        <b-col class="item">
          <h2>{{$t('time')}}</h2>
          <span>{{blockDetails.BlockTime | formatDate}}</span>
        </b-col>
      </b-row>
      <b-row class="description">
        <b-col class="item first">
          <h2>{{$t('block.merkleroot')}}</h2>
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
    name:'blockDetails',
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
          label: this.$t('hash')
        },
        {
          key: "Height",
          label: this.$t('height')
        },
        {
          key: "ConfirmFlag",
          label: this.$t('status')
        },
        {
          key: "TxnTime",
          label: this.$t('time')
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
