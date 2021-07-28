/* eslint-disable global-require */
module.exports = {
  configs: {
    base: require('./lib/configs/base'),
    browser: require('./lib/configs/browser'),
    node: require('./lib/configs/node'),
    vue: require('./lib/configs/vue'),
    'browser-vue': require('./lib/configs/browser-vue'),
    'node-vue': require('./lib/configs/node-vue'),
  },
}
