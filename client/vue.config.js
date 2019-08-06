module.exports = {
    // options...
    chainWebpack: config => {
        config.externals({
          'vue': 'Vue',
          'moment': 'moment',
        //   'bootstrap':'BootstrapVue',
          'bootstrap-vue':'bootstrapVue',
          'vue-router':'VueRouter',
          'vue-i18n':'VueI18n'
        })
      }
}