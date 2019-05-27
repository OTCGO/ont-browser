<template>
  <div class="container">
    <h2 class="text-center neo-page-title"></h2>
    <div>
      <b-form-select v-model="tokenType" class="mb-3">
        <option value="oep4">oep4</option>
        <option value="oep5">oep5</option>
        <option value="oep8">oep8</option>
      </b-form-select>
    </div>
    <b-table class="token-list" :fields="fields" :items="contractList">
      <template slot="ContractHash" slot-scope="data">
        <router-link
          :to="'token-details/'+tokenType+'/'+data.value"
          class="text-color"
        >{{data.value}}</router-link>
      </template>
      <template slot="Name" slot-scope="data">
        <router-link
          :to="'token-details/'+tokenType+'/'+data.value"
          class="text-color"
        >{{data.value}}</router-link>
      </template>
    </b-table>
    <b-row class="justify-content-center">
      <b-col md="8" sm="12">
        <b-pagination align="fill" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="less" scoped>
@import "token.less";
</style>


<script>
import { getTokenList } from "@/apis/server/index";

export default {
  data() {
    return {
      contractList: [],
      total: 0,
      currentPage: 1,
      perPage: 15,
      tokenType: "oep4"
    };
  },
  computed: {
    fields() {
      return [
        {
          key: "Name",
          label: "名称"
        },
        {
          key: "ContractHash",
          label: `哈希`
        },
        {
          key: "TotalSupply",
          label: "总量"
        },

        {
          key: "TxCount",
          label: "交易数"
        }
      ];
    }
  },
  mounted() {
    this.getTokenList();
  },
  methods: {
    async getTokenList() {
      const result = await getTokenList(
        this.tokenType,
        this.perPage,
        this.currentPage
      );
      this.contractList = result.ContractList;
      this.total = result.Total;
    }
  },
  watch: {
    tokenType() {
      this.getTokenList();
    },
    currentPage() {
      this.getTokenList();
    }
  }
};
</script>