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
    <b-table class="ont-block-list" :fields="fields" :items="items">
      <template slot="Height" slot-scope="data">
        <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
      </template>
      <template slot="Hash" slot-scope="data">
        <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
      </template>
      <template slot="BlockTime" slot-scope="data">{{data.value | formatDate}}</template>
    </b-table>
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
          key: "Height",
          label: "高度"
        },
        {
          key: "Hash",
          label: "哈希"
        },
        {
          key: "TxnNum",
          label: "交易数"
        },
        {
          key: "BlockSize",
          label: `大小`
        },
        {
          key: "BlockTime",
          label: "时间"
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
        this.items = result.BlockList;
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
