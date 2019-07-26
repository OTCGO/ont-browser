<style scoped lang="less">
.ont-page-title {
  font-size: 2.5rem;
  color: #fff;
  margin: 1.5rem 0;
}
.ont-block-list {
  color: #fff;
  border-bottom: 1px solid #fff;
}
</style>
<template>
  <div class="blockIndex container">
    <h2 class="text-center ont-page-title">{{$t('slider.block.name')}}</h2>
    <div class="table-content">
    <b-table class="ont-block-list" :fields="fields" :items="items">
      <template slot="block_height" slot-scope="data">
        <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
      </template>
      <template slot="block_hash" slot-scope="data">
        <div >{{data.value | shortHash}}</div>
      </template>
      <template slot="block_time" slot-scope="data">{{data.value | formatDate}}</template>
    </b-table>
    </div>
    <b-row class="justify-content-center">
      <b-col md="8" sm="12">
        <b-pagination align="fill" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { getBlockList } from "@/apis/server/index";
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
          key: "block_height",
          label: this.$t('block.height')
        },
        {
          key: "block_hash",
          label: this.$t('hash')
        },
        {
          key: "tx_count",
          label: this.$t('block.transactions')
        },
        {
          key: "block_size",
          label:  this.$t('size')
        },
        {
          key: "block_time",
          label:  this.$t('time')
        }
      ];
    }
  },
  mounted() {
    this.getBlock();
  },
  watch: {
    currentPage: {
      handler: function(value) {
        this.getBlock(this.perPage, value);
      }
    }
  },
  methods: {
    async getBlock(pagesize, pagenumber) {
      try {
        const result = await getBlockList(
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
