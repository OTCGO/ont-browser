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
    <h2 class="text-center neo-page-title">{{$t('slider.transaction.name')}}</h2>
    <b-table class="neo-block-list" :fields="fields" :items="items">
      <template slot="TxnHash" slot-scope="data">
        <router-link
          :to="'/translate-details/'+data.value"
          class="text-hidden text-color"
        >{{data.value.substr(0,8) + '...' + data.value.substr(56)}}</router-link>
      </template>
      <template slot="TxnTime" slot-scope="data">{{data.value | formatDate}}</template>
    </b-table>
    <b-row class="justify-content-center">
      <b-col md="8" sm="12">
    <b-pagination align="fill" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
      </b-col></b-row>
  </div>
</template>
<script>
import { getTransactionList } from "@/apis/server/index";
export default {
  data() {
    return {
      items: [],
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
          label: "哈希"
        },
        {
          key: "TxnType",
          label: "交易类型"
        },
        {
          key: "Height",
          label: "高度"
        },
        {
          key: "TxnTime",
          label: "时间"
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
        this.items = result.TxnList;
        if (!pagenumber) {
          this.total = result.Total;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
