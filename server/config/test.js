module.exports = {
  app: {
    port: 3020
  },
  db: {
    options: {
      host: 'localhost',
      port: 27017,
      user: '',
      pass: ''
    },
    database: 'test-campaign',
    dbBusiness: 'test-business',
    debug: true
  },
  redis: {
    port: '6379',
    host: 'localhost',
    password: ''
  },
  userMgtApi: 'http://staging-kong.chinacloudapp.cn:4000',
  mdcApi: 'http://staging-api.chinacloudapp.cn:3001',
  venuesApi: '',
  userWishDetailUrl: 'http://staging-app.nightplus.cn/app/static/campaign/dreams.html',
  fifaCampaignKey: 'fretRe7we#uxAd?aPeYuc?=re5h'
}
