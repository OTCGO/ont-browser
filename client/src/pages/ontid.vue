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
    <h2 class="text-center neo-page-title">最新 ONT ID</h2>
    <b-table class="neo-block-list" :fields="fields" :items="items">
      <template slot="TxnHash" slot-scope="data">
        <router-link class="text-color" :to="'/translate-details/'+data.value">{{data.value}}</router-link>
      </template>
      <template slot="OntId" slot-scope="data">
        <router-link class="text-color" :to="'/ontid-details/'+data.value">{{data.value}}</router-link>
      </template>
      <template slot="TxnTime" slot-scope="data">{{data.value | formatDate}}</template>
      <template slot="Height" slot-scope="data">
        <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
      </template>
    </b-table>
    <b-pagination align="center" :total-rows="100" v-model="currentPage" :per-page="10"></b-pagination>
  </div>
</template>
<script>
import { getOntIdList } from "@/apis/server/index";
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
          key: "OntId",
          label: "ont id"
        },
        {
          key: "Height",
          label: "高度"
        },
        {
          key: "Description",
          label: "描述"
        },
        {
          key: "TxnTime",
          label: "时间"
        }
      ];
    }
  },
  watch: {
    currentPage: {
      handler: function(value) {
        this.getOntIdList(this.perPage, value);
      }
    }
  },
  mounted() {
    this.getOntIdList();
  },
  methods: {
    async getOntIdList(pagesize, pagenumber) {
      try {
        const result = await getOntIdList(
          pagesize || this.perPage,
          pagenumber || this.currentPage
        );
        this.items = result.OntIdList;
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
