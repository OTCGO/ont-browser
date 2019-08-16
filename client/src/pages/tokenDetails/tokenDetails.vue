<template>
  <div class="container">
    <b-container>
      <b-row>
        <b-col>
          <h3>{{tokenDetails.name}}</h3>
          <br>
          {{tokenDetails.description}}
        </b-col>
      </b-row>

      <b-row class="description">
        <b-col class="item first">
          <h2>{{$t('hash')}}</h2>
          <span class="text-color break-all">{{$route.params.hash}}</span>
        </b-col>
        <b-col class="item">
          <h2>{{$t('token.txCount')}}</h2>
          <span>{{tokenDetails.tx_count}}</span>
        </b-col>
        <b-col class="item">
          <h2>{{$t('token.addresses')}}</h2>
          <span class="break-all">{{tokenDetails.address_count}}</span>
        </b-col>
      </b-row>
      <b-row class="description">
        <b-col class="item first">
          <h2>{{$t('time')}}</h2>
          <span>{{tokenDetails.create_time | formatDate }}</span>
        </b-col>
        <b-col class="item">
          <h2>{{$t('token.symbol')}}</h2>
          <span>{{tokenDetails.symbol }}</span>
        </b-col>
        <b-col class="item">
          <h2>{{$t('token.amount')}}</h2>
          <span>{{tokenDetails.total_supply | formatNum}}</span>
        </b-col>
      </b-row>
    </b-container>

    <b-tabs class="contract-tab" content-class="mt-3">
      <b-tab :title="$t('contract.transaction')" active>
          <div class="table-content">
            <b-table class="tran-list" :fields="fields" :items="tx_list">
              <template slot="tx_hash" slot-scope="data">
                <router-link class="text-color" :to="'/translate-details/'+data.value">{{data.value | shortHash}}</router-link>
              </template>
              <template slot="block_height" slot-scope="data">
                <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
              </template>
              <!-- <template slot="confirm_flag" slot-scope="data">{{ data.value | formatFlayType | t }}</template> -->
              <template slot="tx_time" slot-scope="data">{{data.value | formatDate}}</template>
            </b-table>
          </div>
        <b-row class="justify-content-center">
          <b-col md="8" sm="12">
            <b-pagination align="fill" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
          </b-col></b-row>
      </b-tab>
      <b-tab :title="$t('token.code')">
      <textarea name="" rows="6" v-model="tokenDetails.code" style="width:100%;" readonly></textarea>
      </b-tab>
      <b-tab title="ABI">
      <textarea name="" rows="6" v-model="tokenDetails.abi" style="width:100%;" readonly></textarea>
      </b-tab>
      <!--<b-tab title="数据统计">-->

      <!--</b-tab>-->
    </b-tabs>
  </div>
</template>
<script>
import { getTokenTranslate,getTokenDetail } from "@/apis/server/index";
import { confirmFlagType } from '@/confirmFlagType/index';

export default {
    name:'tokenDetails',
  data() {
    return {
      tokenDetails: {},
      total: 0,
      currentPage: 1,
      perPage: 15,
      tx_list:[]
    };
  },
  computed: {
    fields() {
      return [
        {
          key: "tx_hash",
          label: this.$t('hash')
        },
        {
          key: "block_height",
          label: this.$t('height')
        },
        {
          key: "confirm_flag",
          label: this.$t('status'),
          formatter:(value) =>{
            // console.log('confirm_flag',value)
            return this.$t(confirmFlagType[value]);
          }
        },
        {
          key: "tx_time",
          label: this.$t('time')
        }
      ];
    }
  },
  mounted() {
    this.getToken();
    this.getTokenTranslate()
  },
  watch: {
    currentPage: {
      handler: function(value) {
          this.getTokenTranslate(this.perPage, value)
      }
    },
    $route() {
//        this.currentPage=1
//        this.getToken(this.perPage, this.currentPage);
//        this.getTokenTranslate(this.perPage, this.currentPage)
    },
    // confirm_flag:  {
    //   handler:function(value){
    //       return this.$t(confirmFlagType[value]);
    //   }
   

  },
  methods: {
    async getToken() {
      let hash = this.$route.params.hash;
      let type = this.$route.params.type;
      const result = await getTokenDetail(
        type,
        hash
      );
      this.tokenDetails = result;
    },
      async getTokenTranslate(pagesize, pagenumber) {
          let hash = this.$route.params.hash;
          let type = this.$route.params.type;
          const result = await getTokenTranslate(
              type,
              hash,
              pagesize || this.perPage,
              pagenumber || this.currentPage
          );
          this.tx_list = result.records;
          if (!pagenumber) {
              this.total = result.total;
          }
      }
  }
};
</script>
<style lang="less" scoped>
@import "tokenDetails.less";
</style>
<style>
  .nav-item .nav-link{
    color: #fff;
  }
</style>
