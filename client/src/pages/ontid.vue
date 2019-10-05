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
    <page-header :title="$t('ontId.title')">
      <span slot>
        {{$t('ontId.total')}} | {{total|formatNum}}
      </span>
    </page-header>
    <div class="table-content">
    <b-table class="neo-block-list" :fields="fields" :items="items">
      <template slot="tx_hash" slot-scope="data">
        <router-link class="text-color" :to="'/translate-details/'+data.value">{{data.value | shortHash}}</router-link>
      </template>
      <template slot="ontid" slot-scope="data">
        <router-link class="text-color" :to="'/ontid-details/'+data.value">{{data.value | shortHash}}</router-link>
      </template>
      <template slot="tx_time" slot-scope="data">{{data.value | formatDate}}</template>
      <template slot="block_height" slot-scope="data">
        <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
      </template>
    </b-table>
    </div>
    <b-row class="justify-content-center">
      <b-col md="8" sm="12">
        <b-pagination align="fill" :total-rows="total" v-model="currentPage" :per-page="perPage"></b-pagination>
      </b-col></b-row> </div>
</template>
<script>
import { getOntIdList } from "@/apis/server/index";
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
    components:{pageHeader},
  computed: {
    fields() {
      return [
        {
          key: "tx_hash",
          label: this.$t('hash')
        },
        {
          key: "ontid",
          label: "ONT ID"
        },
        {
          key: "block_height",
          label: this.$t('height')
        },
        {
          key: "description",
          label: this.$t('ontId.desc')
        },
        {
          key: "tx_time",
          label: this.$t('time')
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
