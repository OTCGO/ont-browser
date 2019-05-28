<style scoped lang="less">
.head {
  width: 100%;
  display: flex;
  padding: 2rem 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  h2 {
    font-size: 2rem;
    color: #fff;
  }
  .search-group {
    margin: 2rem 0;
  }
  .search-btn {
    padding: 0 2rem;
  }
}

.ont-dynamic-list {
  margin: 0 auto;
  .ont-dynamic-item {
    position: relative;
    padding: 15px;

    .ont-dynamic-link {
      cursor: pointer;
    }
    .ont-dynamic-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      z-index: 1;
      padding: 15px 0;
      p {
        margin: 0;
        line-height: 1.5;
      }
      .ont-dynamic-title {
        font-size: 1rem;
      }
      .ont-dynamic-value {
        font-size: 1.5rem;
        margin-top: 1rem;
      }
    }
  }
}

.ont-bg {
  position: absolute;
  top: 15px;
  left: 15px;
  bottom: 15px;
  right: 15px;
  background: #308fd8;
  opacity: 0.4;
}

.ont-dynamic-link:hover .ont-dynamic-content {
  color: #0056b3 !important;
}

.ont-block-list {
  padding: 15px;
  color: #fff;
}
.title-color {
  z-index: 1;
  line-height: 3;
  align-items: center;
  color: #fff;
  &:hover {
    color: #0056b3;
  }
}
.ont-block-item {
  padding: 0;
  margin: 0;
  border-top: 1px solid #fff;
  z-index: 1;
  .ont-block-content {
    padding: 10px 0;
  }
}
.ont-item-title {
  font-size: 1.5rem;
}
.search-form {
  width: 100%;
  justify-content: center;
}
</style>
<template>
  <div class="el-container">
    <div class="head">
      <h2>ONT区块浏览器</h2>
      <b-form class="search-form row" inline v-on:submit="searchBlock">
        <b-input-group size="lg" class="search-group col-md-6 col-offset-md-3 col-sm-12">
          <b-form-input v-model="searchKey" :placeholder="$t('slider.dynamic.search')"></b-form-input>
          <b-input-group-append>
            <b-btn @click="searchBlock" class="btn search-btn">{{$t('search')}}</b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-form>
    </div>
    <div class="row container ont-dynamic-list">
      <!-- <div class="col-md-2 col-lg-2 ont-dynamic-item col-sm-4">
        <div class="ont-bg"></div>
        <div class="ont-dynamic-content">
          <p class="ont-dynamic-title">当前区块高度</p>
          <p class="ont-dynamic-value">2016-08-15</p>
        </div>
      </div>-->
      <router-link to="/" class="col-md-3 ont-dynamic-link ont-dynamic-item col-sm-4">
        <div class="ont-bg"></div>
        <div class="ont-dynamic-content">
          <p class="ont-dynamic-title">当前区块高度</p>
          <p class="ont-dynamic-value">{{summary.CurrentHeight}}</p>
        </div>
      </router-link>
      <router-link to="/" class="col-md-3 ont-dynamic-link ont-dynamic-item col-sm-4">
        <div class="ont-bg"></div>
        <div class="ont-dynamic-content">
          <p class="ont-dynamic-title">交易数量</p>
          <p class="ont-dynamic-value">{{summary.TxnCount}}</p>
        </div>
      </router-link>
      <router-link to="/" class="col-md-3 ont-dynamic-item ont-dynamic-link col-sm-4">
        <div class="ont-bg"></div>
        <div class="ont-dynamic-content">
          <p class="ont-dynamic-title">节点数量</p>
          <p class="ont-dynamic-value">{{summary.NodeCount}}</p>
        </div>
      </router-link>
      <router-link to="/" class="col-md-3 ont-dynamic-item ont-dynamic-link col-sm-4">
        <div class="ont-bg"></div>
        <div class="ont-dynamic-content">
          <p class="ont-dynamic-title">OntId数量</p>
          <p class="ont-dynamic-value">{{summary.OntIdCount}}</p>
        </div>
      </router-link>
      <div class="col-md-3 ont-dynamic-item col-sm-4">
        <div class="ont-bg"></div>
        <div class="ont-dynamic-content">
          <p class="ont-dynamic-title">地址数量</p>
          <p class="ont-dynamic-value">{{summary.AddressCount}}</p>
        </div>
      </div>
      <!-- <router-link to="/" class="col-md-2 ont-dynamic-item ont-dynamic-link col-sm-4">
        <div class="ont-bg"></div>
        <div class="ont-dynamic-content">
          <p class="ont-dynamic-title">{{$t('dynamic.addressNum')}}</p>
          <p class="ont-dynamic-value">2016-08-15</p>
        </div>
      </router-link>
      <router-link to="/" class="col-md-2 ont-dynamic-item ont-dynamic-link col-sm-4">
        <div class="ont-bg"></div>
        <div class="ont-dynamic-content">
          <p class="ont-dynamic-title">{{$t('dynamic.newBlock')}}</p>
          <p class="ont-dynamic-value">09{{$t('dynamic.second')}}</p>
        </div>
      </router-link>-->
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="ont-block-list">
            <div class="ont-bg"></div>
            <router-link to="/block" class=" title-color">
              <b-row>
                <b-col cols="8" >{{$t('slider.block.name')}}</b-col>
                <b-col cols="4">
                  <div class="title-more text-right">>></div>
                </b-col>
              </b-row>
            </router-link>
            <div class="row ont-block-item" v-for="item in block" :key="item.Height">
              <div class="col-sm-12 ont-block-content">
                <div class="row" style="align-items: center">
                  <router-link
                    :to="'/block-details/'+item.Height"
                    class="col-6 text-left pointer text-color ont-item-title"
                  >{{item.Height}}</router-link>
                  <div class="col-6 text-right">{{item.TxnNum}} Transaction</div>
                </div>
                <div class="row block-item-sub-wrapper">
                  <span class="block-item col-6 text-left">{{item.BlockSize}} byte</span>
                  <span class="block-item col-6 text-right">{{item.BlockTime | formatDate}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="ont-block-list">
            <div class="ont-bg"></div>
            <router-link to="/translate" class="row title-color">
              <div class="col-8">{{$t('slider.transaction.name')}}</div>
              <div class="col-4">
                <div class="title-more text-right">>></div>
              </div>
            </router-link>
            <div class="row ont-block-item" v-for="item in transaction" :key="item.index">
              <div class="col-sm-12 ont-block-content">
                <div class="row" style="align-items: center">
                  <router-link
                    :to="/translate-details/+item.TxnHash"
                    class="text-hidden text-color col-6 text-left"
                  >{{item.TxnHash}}</router-link>
                  <div class="col-6 text-right">{{item.TxnTime | formatDate}}</div>
                </div>
                <div class>{{ item.TxnType | formatTxType }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="ont-block-list">
            <div class="ont-bg"></div>
            <router-link to="/ontid" class="row title-color">
              <div class="col-8">最新ID事件</div>
              <div class="col-4">
                <div class="title-more text-right">>></div>
              </div>
            </router-link>
            <div class="row ont-block-item" v-for="item in ontid" :key="item.index">
              <div class="col-sm-12 ont-block-content">
                <div class="row" style="align-items: center">
                  <router-link
                    :to="'/ontid-details/'+item.OntId"
                    class="text-hidden text-color col-6 text-left"
                  >{{item.OntId}}</router-link>
                  <div class="col-6 text-right">{{item.TxnTime | formatDate}}</div>
                </div>
                <div class>{{item.Description}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getSummaryInfo,
  getBlockList,
  getTransactionList,
  getOntIdList,
  getOntId,
  getBlockByHeightOrHash,
  getTransactionByHash,
  getAddressInfo,
  getContractInfo
} from "@/apis/server/index";

export default {
  data() {
    return {
      summary: {
        CurrentHeight: 0,
        TxnCount: 0,
        NodeCount: 0,
        OntIdCount: 0,
        AddressCount: 0
      },
      block: [],
      transaction: [],
      ontid: [],
      searchKey: ""
    };
  },
  mounted() {
    this.getSummary();
    this.getLastBlock();
    this.getLastTransaction();
    this.getLastOntId();
  },
  methods: {
    async getSummary() {
      try {
        this.summary = await getSummaryInfo();
      } catch (error) {}
    },
    async getLastBlock() {
      try {
        const result = await getBlockList(8, 1);
        this.block = result.BlockList;
      } catch (error) {
        //console.log('')
      }
    },
    async getLastTransaction() {
      try {
        const result = await getTransactionList(8, 1);
        this.transaction = result.TxnList;
      } catch (error) {}
    },
    async getLastOntId() {
      try {
        const result = await getOntIdList(8, 1);
        this.ontid = result.OntIdList;
      } catch (error) {}
    },
    async searchBlock() {
      if (this.searchKey !== "") {
        switch (this.searchKey.length) {
          /* txhash */
          case 64:
            this.searchHash(this.searchKey);
            break;
          /* address */
          case 34:
            this.searchAddress(this.searchKey);
            break;
          /* contract hash */
          case 40:
            this.searchContract(this.searchKey);
            break;
          /* ontid */
          case 42:
            this.searchONTID(this.searchKey);
            break;
          /* block height */
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
            this.searchHeight(this.searchKey);
            break;
          default:
            this.notFound();
        }
      }

      return false;
    },
    async searchHeight(searchKey) {
      const result = await getBlockByHeightOrHash(searchKey);
      if (result) {
        this.$router.push("/block-details/" + searchKey);
      } else {
        this.notFound();
      }
    },
    async searchONTID(searchKey) {
      const result = await getOntId(searchKey, 1, 1);
      if (result.Result) {
        this.$router.push("/ontid-details/" + searchKey);
      } else {
        this.notFound();
      }
    },
    async searchContract(searchKey) {
      const result = await getContractInfo(searchKey, 1, 1);
      if (result) {
        this.$router.push("/contract-details/" + searchKey);
      } else {
        this.notFound();
      }
    },
    async searchAddress(searchKey) {
      this.$router.push("/address-details/" + searchKey);
      
      // const result = await getAddressInfo(searchKey,15,1);
      // if (result) {
      //   this.$router.push("/address-details/" + searchKey);
      // } else {
      //   this.notFound();
      // }
    },
    async searchHash(searchKey) {
      const result = await getTransactionByHash(searchKey);
      if (result) {
        this.$router.push("/translate-details/" + searchKey);
      } else {
        this.notFound();
      }
    },
    notFound() {
      this.$bvToast.toast("对不起，无法找到您输入的搜索内容", {
        title: `提示`,
        variant: "info",
        autoHideDelay: 5000,
        solid: true
      });
    }
  }
};
</script>
