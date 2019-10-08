<style scoped lang="less">
    .search-form {
        width: 100%;
        justify-content: center;
        .ont-search {
            border-radius: 8rem;
            padding: 0;
            overflow: hidden;
            position: relative;
            .search-icon{
                position: absolute;
                font-size: 1.5rem;
                color:#2A78EA;
                z-index: 3;
            }
        }
    }
</style>
<template>
    <b-form class="search-form row" inline v-on:submit="searchBlock">
        <b-input-group :size="size" class="ont-search search-group col-sm-12">
            <b-form-input v-model="searchKey" :placeholder="$t('slider.dynamic.search')"></b-form-input>
            <i class="iconfont iconsearch search-icon" :style="style"></i>
        </b-input-group>
    </b-form>
</template>
<script>
    import {
        // getSummaryInfo,
        // getLatestBlock,
        // getLatestTransaction,
        // getLatestOntId,
        getOntId,
        getBlockByHeightOrHash,
        getTransactionByHash,
        getContractInfo
    } from '@/apis/server/index';

    export default {
        data () {
            return {};
        },
        props:{
            size:{
                type:String,
                default:'md'
            }
        },
        computed:{
            style(){
                if(this.size==='lg'){
                    return {
                        top:'6px',
                        right:'20px'
                    }
                }else{
                    return {
                        top:'2px',
                        right:'12px'
                    }
                }
            }
        },
        methods: {
            async searchBlock () {
                if (this.searchKey !== '') {
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
            async searchHeight (searchKey) {
                const result = await getBlockByHeightOrHash(searchKey);
                if (result) {
                    this.$router.push('/block-details/' + searchKey);
                } else {
                    this.notFound();
                }
            },
            async searchONTID (searchKey) {
                const result = await getOntId(searchKey, 1, 1);
                if (result) {
                    this.$router.push('/ontid-details/' + searchKey);
                } else {
                    this.notFound();
                }
            },
            async searchContract (searchKey) {
                const result = await getContractInfo(searchKey, 1, 1);
                if (result) {
                    this.$router.push('/contract-details/' + searchKey);
                } else {
                    this.notFound();
                }
            },
            async searchAddress (searchKey) {
                this.$router.push('/address-details/' + searchKey);

                // const result = await getAddressInfo(searchKey,15,1);
                // if (result) {
                //   this.$router.push("/address-details/" + searchKey);
                // } else {
                //   this.notFound();
                // }
            },
            async searchHash (searchKey) {
                const result = await getTransactionByHash(searchKey);
                if (result) {
                    this.$router.push('/translate-details/' + searchKey);
                } else {
                    this.notFound();
                }
            },
            notFound () {
                this.$bvToast.toast(this.$t('searchError'), {
                    title: this.$t('tips'),
                    variant: 'info',
                    autoHideDelay: 5000,
                    solid: true
                });
            }
        }
    };
</script>