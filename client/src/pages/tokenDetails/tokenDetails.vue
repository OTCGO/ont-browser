<template>
  <div class="container">
    <b-container>
      <b-row>
        <b-col>
          <h3>{{tokenDetails.Name}}</h3>
          <br>
          {{tokenDetails.Description}}
        </b-col>
      </b-row>

      <b-row class="description">
        <b-col class="item first">
          <h2>{{$t('hash')}}</h2>
          <span class="text-color break-all">{{$route.params.hash}}</span>
        </b-col>
        <b-col class="item">
          <h2>{{$t('token.txCount')}}</h2>
          <span>{{tokenDetails.Total}}</span>
        </b-col>
        <b-col class="item">
          <h2>{{$t('token.addresses')}}</h2>
          <span class="break-all">{{tokenDetails.AddressCount}}</span>
        </b-col>
      </b-row>
      <b-row class="description">
        <b-col class="item first">
          <h2>{{$t('time')}}</h2>
          <span>{{tokenDetails.CreateTime | formatDate }}</span>
        </b-col>
        <b-col class="item">
          <h2>{{$t('token.symbol')}}</h2>
          <span>{{tokenDetails.Symbol }}</span>
        </b-col>
        <b-col class="item">
          <h2>{{$t('token.amount')}}</h2>
          <span>{{tokenDetails.TotalSupply}}</span>
        </b-col>
      </b-row>
    </b-container>

    <div>
      <div class="table-content">
        <b-table class="tran-list" :fields="fields" :items="tokenDetails.TxnList">
          <template slot="TxnHash" slot-scope="data">
            <router-link class="text-color" :to="'/translate-details/'+data.value">{{data.value | shortHash}}</router-link>
          </template>
          <template slot="Height" slot-scope="data">
            <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
          </template>
        </b-table>
      </div>
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
