const CompressionPlugin = require('compression-webpack-plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
    chainWebpack (config) {
    // Improve first page loading time
    // ref: https://medium.com/@aetherus.zhou/vue-cli-3-performance-optimization-55316dcd491c
    config.plugins.delete('prefetch')

    // enable build time compression
    config.plugin('CompressionPlugin').use(CompressionPlugin)
    // VuetifyLoaderPlugin
    config.plugin('VuetifyLoaderPlugin').use(VuetifyLoaderPlugin)
  },
}