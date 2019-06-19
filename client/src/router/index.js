import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'home', // 主页面
      component: () => import('@/pages/home.vue')
    },
    {
      path: '/block',
      name: 'block', // 区块列表
      component: () => import('@/pages/blockIndex.vue')
    },
    {
      path: '/block-details/:idx',
      name: 'block-details', // 区块详情
      component: () => import('@/pages/blockDetails/blockDetails.vue')
    },
    {
      path: '/translate',
      name: 'translate', // 交易列表
      component: () => import('@/pages/translateIndex.vue')
    },
    {
      path: '/translate-details/:hash',
      name: 'translate-details', // 交易详情
      component: () => import('@/pages/translateDetails/translateDetails.vue')
    },
      {
          path: '/address/:token',
          name: 'address', // 地址详情
          component: () => import('@/pages/address/addressList.vue')
      },
    {
      path: '/address-details/:address',
      name: 'address-details', // 地址详情
      component: () => import('@/pages/address/address.vue')
    },
    {
      path: '/ontid',
      name: 'ontid', // onit 列表
      component: () => import('@/pages/ontid.vue')
    },
    {
      path: '/ontid-details/:id',
      name: 'ontid-details', //onit 详情
      component: () => import('@/pages/ontidDetails/ontidDetails.vue')
    },
    {
      path: '/token',
      name: 'token', // token 列表
      component: () => import('@/pages/token/token.vue')
    },
    {
      path: '/token-details/:type/:hash',
      name: 'token-details', // // token 详情
      component: () => import('@/pages/tokenDetails/tokenDetails.vue')
    },{
      path: '/contract-details/:hash',
      name: 'contract-details', // 合约 详情
      component: () => import('@/pages/contract/contractDetails.vue')
    },{
      path: '/contract',
      name: 'contract', // 合约 详情
      component: () => import('@/pages/contract/contract.vue')
    }
  ]
});