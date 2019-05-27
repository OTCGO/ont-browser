<template>
  <div class="container">
    <b-container>
      <b-row>
        <b-col>hash:{{hash}}</b-col>
      </b-row>

      <b-row class="description">
        <b-col class="item first">
          <h2>高度</h2>
          <span class="text-color">{{txDetails.Height}}</span>
        </b-col>
        <b-col class="item">
          <h2>类型</h2>
          <span>{{txDetails.TxnType | formatTxType}}</span>
        </b-col>
        <b-col class="item">
          <h2>时间</h2>
          <span>{{txDetails.TxnTime | formatDate }}</span>
        </b-col>
      </b-row>
      <b-row class="description">
        <b-col class="item first">
          <h2>手续费</h2>
          <span>{{txDetails.Fee}}</span>
        </b-col>
        <b-col class="item">
          <h2>状态</h2>
          <span>{{txDetails.ConfirmFlag}}</span>
        </b-col>
      </b-row>
    </b-container>
    <div v-if="transferList.length">
      <b-table class="tran-list" :fields="fields" :items="transferList">
        <template slot="FromAddress" slot-scope="data">
          <router-link class="text-color" :to="'/address-details/'+data.value">{{data.value}}</router-link>
        </template>
        <template slot="ToAddress" slot-scope="data">
          <router-link class="text-color" :to="'/address-details/'+data.value">{{data.value}}</router-link>
        </template>
      </b-table>
    </div>

    <div v-if="ontId.length">
      <b-table class="onid-list" :fields="fieldsOntId" :items="ontId">
        <template slot="OntId" slot-scope="data">
          <router-link class="text-color" :to="'/ontid-details/'+data.value">{{data.value}}</router-link>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import { getTransactionByHash } from "@/apis/server/index";

export default {
  data() {
    return {
      txDetails: {},
      transferList: [],
      ontId: []
    };
  },
  mounted() {
    this.getTransactionByHash();
  },
  computed: {
    fields() {
      return [
        {
          key: "AssetName",
          label: "资产"
        },
        {
          key: "FromAddress",
          label: "转出地址"
        },
        {
          key: "ToAddress",
          label: `转入地址`
        },
        {
          key: "AssetName",
          label: "金额"
        },
        {
          key: "Description",
          label: "操作"
        }
      ];
    },
    fieldsOntId() {
      return [
        {
          key: "OntId",
          label: "Ont Id"
        },
        {
          key: "Description",
          label: "描述"
        }
      ];
    },
    hash() {
      return this.$route.params.hash;
    }
  },
  methods: {
    async getTransactionByHash() {
      const result = await getTransactionByHash(this.hash);
      this.txDetails = result;
      if (result.Description.indexOf("ontId") >= 0) {
        return (this.OntId = result.Detail.OntId ? [result.Detail] : []);
      }

      if (result.Description === "transfer") {
        return (this.transferList = result.Detail.TransferList);
      }
      // switch(result.Description){
      //   case :
      // }
      // this.txDetails = result;
      // this.OntId = result.Detail.OntId ? [result.Detail] : [];
      // console.log("this.OntId", this.OntId);
    }
  },
  watch: {
    $route() {
      this.getTransactionByHash();
    }
  }
};
</script>

<style lang="less" scoped>
@import "translateDetails.less";
</style>
