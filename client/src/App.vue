<template>
  <div @click="clickApp" id="app">
    <neo-header ref="neoHeader"></neo-header>
    <keep-alive :exclude="/.Details/">
      <router-view></router-view>
    </keep-alive>
    <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <neo-footer></neo-footer>
  </div>
</template>

<script>
  import neoHeader from './components/neoHeader.vue';
  import neoFooter from './components/neoFooter.vue';

  export default {
    name: 'App',
    components: {
      neoHeader,
      neoFooter
    },
    methods: {
      clickApp () {
//        this.$refs.neoHeader.hideLangSelect();
      }
    }
  };
</script>

<style>
  #app {
    min-height: 100%;
    padding: 0 1em;
    overflow-x: hidden;
  }
</style>
