<template>
  <div class="container">
    <h3 >ONT ID {{$t('ontId.detail')}}</h3>
    <b-container>
     <b-row>
        <b-col class="break-all">ONT ID:{{ontid}}</b-col>
      </b-row>
      <b-row class="description">
        <b-col class="item first">
          <h2>Type</h2>
          <span>{{ddo.Owners[0].Type}}</span>
        </b-col>
        <b-col class="item">
          <h2>Curve</h2>
          <span>{{ddo.Owners[0].Curve}}</span>
        </b-col>

      </b-row>
      <b-row class="description">
        <b-col cols="12" class="item first">
          <h2>Value</h2>
          <span class="break-all">{{ddo.Owners[0].Value}}</span>
        </b-col>
        <b-col cols="12" class="item first">
          <h2>PublicKeyId</h2>
          <span class="break-all">{{ddo.Owners[0].PubKeyId}}</span>
        </b-col>
      </b-row>
    </b-container>

    <div class="row">
      <h3 >{{$t('ontId.event')}}</h3>
      <div class="table-content">
        <b-table class="tran-list" :fields="fields" :items="items">
          <template slot="TxnHash" slot-scope="data">
            <router-link class="text-color" :to="'/translate-details/'+data.value">{{data.value | shortHash}}</router-link>
          </template>
          <template slot="Height" slot-scope="data">
            <router-link class="text-color" :to="'/block-details/'+data.value">{{data.value}}</router-link>
          </template>
          <template slot="TxnTime" slot-scope="data">{{data.value | formatDate}}</template>
        </b-table>
      </div>
      <!-- <b-pagination align="center" :total-rows="100" v-model="currentPage" :per-page="10"></b-pagination> -->
    </div>
  </div>
</template>
<script>
import { getOntId } from "@/apis/server/index";
export default {
  data() {
    return {
      items: [],
      ddo: {
        Owners: [
          {
            Type: "",
            Curve: "",
            Value: "",
            PublicKeyId: ""
          }
        ]
      }
      // currentPage: 1
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
          key: "OntId",
          label: "ONT ID"
        },
        {
          key: "Height",
          label: this.$t('height')
        },
        {
          key: "Description",
          label: this.$t('ontId.desc')
        },
        {
          key: "TxnTime",
          label: this.$t('time')
        }
      ];
    },
    ontid() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.getOntId();
  },
  methods: {
    async getOntId() {
      try {
        const result = await getOntId(this.ontid, 20, 1);
        this.items = result.TxnList;
        this.ddo = result.Ddo;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "ontidDetails.less";
</style>
