<style scoped lang="less">
.neo-page-title {
  font-size: 2.5rem;
  color: #fff;
  margin: 1.5rem 0;
}
.neo-block-list {
  color: #fff;
  border-bottom: 1px solid #fff;
}
</style>
<template>
  <div class="blockIndex container">
    <page-header :title="$t('slider.transaction.name')">
      <span slot>
      {{$t('transaction.total')}} | {{total|formatNum}}
      </span>
    </page-header>
    <div class="table-content">
      <b-table class="neo-block-list" :fields="fields" :items="items">
        <template slot="tx_hash" slot-scope="data">
          <router-link
                  :to="'/translate-details/'+data.value"
                  class="text-hidden text-color"
          >{{data.value | shortHash}}</router-link>
        </template>
        <template slot="tx_type" slot-scope="data">{{$t(data.value)}}</template>
        <template slot="confirm_flag" slot-scope="data">{{data.value}}</template>
        <template slot="block_height" slot-scope="data">{{data.value|formatNum}}</template>
        <template slot="fee" slot-scope="data">{{parseFloat(data.value)}}</template>
        <template slot="tx_time" slot-scope="data">{{data.value | formatDate}}</template>
      </b-table>
    </div>
    <b-row class="justify-content-center">
      <b-col md="8" sm="12">
    <b-pagination align="fill" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
      </b-col></b-row>
  </div>
</template>
<script>
import { getTransactionList } from "@/apis/server/index";
import {confirmFlagType} from '@/confirmFlagType/index';
import pageHeader from '@/components/pageHeader/pageHeader'
export default {
  data() {
    return {
      items: [],
      total: 0,
      currentPage: 1,
      perPage: 15
    };
  },
    components:{
      pageHeader
    },
  computed: {
    fields() {
      return [
        {
          key: "tx_hash",
          label: this.$t('hash')
        },
        {
          key: "tx_type",
          label: this.$t('transaction.type')
        }, {
          key: "confirm_flag",
          label: this.$t('status'),
              formatter:(value,key,item)=>{
              return this.$t(confirmFlagType[value]);
              }
        },
        {
          key: "block_height",
          label: this.$t('height')
        }, {
          key: "fee",
          label: this.$t('transaction.fee')
        },
        {
          key: "tx_time",
          label: this.$t('time')
        }
      ];
    }
  },
  mounted() {
    this.getTransaction();
  },
  watch: {
    currentPage: {
      handler: function(value) {
        this.getTransaction(this.perPage, value);
      }
    }
  },
  methods: {
    async getTransaction(pagesize, pagenumber) {
      try {
        const result = await getTransactionList(
          pagesize || this.perPage,
          pagenumber || this.currentPage
        );
        this.items = result.records;
        if (!pagenumber) {
          this.total = result.total;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
