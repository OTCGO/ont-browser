// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueI18n from 'vue-i18n';
/*import ElementUI from 'element-ui';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import locale from 'element-ui/lib/locale';*/
import Bootstrap from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import zh_cn from '@/assets/i18n/zhCHS';
import zh_en from '@/assets/i18n/en';
// import 'element-ui/lib/theme-chalk/index.css';

import '@/style/common.less';


import {
    formatDate,
    formatTxType,
    shortHash,
    formatFlayType
} from '@/filters';

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(Bootstrap);

Vue.filter('formatDate', formatDate);
Vue.filter('formatTxType', formatTxType);
Vue.filter('shortHash', shortHash);
Vue.filter('formatFlayType', formatFlayType);

var i18n = new VueI18n({
    locale: localStorage.getItem('locale') || 'zh-CN',
    messages: {
        'zh-CN': {
            ...zh_cn
        },
        'en-US': {
            ...zh_en
        }
    }
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    i18n,
    router,
    render: h => h(App)
});