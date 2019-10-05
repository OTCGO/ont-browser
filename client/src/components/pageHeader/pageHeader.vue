<style scoped lang="less">
    .page-header {
        margin-bottom: .5rem;
        padding: 0 10px
    }

    .ont-page-title {
        color: #fff;
    }

    .ont-page-sub-title {
        font-size: 1rem;
        color: #fff;
    }

    .search-content {
        display: flex;
        align-items: center;
        justify-content: center
    }
</style>
<template>
    <b-row class="page-header" align-h="between">
        <b-col md="8" sm="12">
            <h3 class="ont-page-title">{{title}}</h3>
            <div class="ont-page-sub-title" slot="">
                <slot></slot>
            </div>
        </b-col>
        <b-col md="4" sm="12" class="search-content">
            <ont-search></ont-search>
        </b-col>
    </b-row>
</template>
<script>
    import ontSearch from '@/components/ontSearch/ontSearch.vue';

    export default {
        components: {
            ontSearch
        },
        props: {
            title: {
                required: true,
                type: String
            }
        }
    };
</script>