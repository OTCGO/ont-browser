<template>
  <div class="container">
    <h2 class="text-center neo-page-title">{{$t('token.title')}}</h2>
    <div>
      <b-form-select v-model="tokenType" class="mb-3">
        <option value="oep4">oep4</option>
        <option value="oep5">oep5</option>
        <option value="oep8">oep8</option>
      </b-form-select>
    </div>
    <div class="table-content">
      <b-table class="token-list" :fields="fields" :items="contractList">
        <template slot="contract_hash" slot-scope="data">
          <router-link
                  :to="'token-details/'+tokenType+'/'+data.value"
                  class="text-color"
          >{{data.value | shortHash}}</router-link>
        </template>
        <template slot="name" slot-scope="data">
          <router-link
                  :to="'token-details/'+tokenType+'/'+data.value"
                  class="text-color"
          >{{data.value}}</router-link>
        </template>
      </b-table>
    </div>

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
          key: "name",
          label: this.$t('token.name')
        },
        {
          key: "contract_hash",
          label: this.$t('hash')
        },
        {
          key: "total_supply",
          label: this.$t('token.amount')
        },

        {
          key: "tx_count",
          label: this.$t('token.txCount')
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
      this.contractList = result.records;
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