const webpack = require('webpack')
const path = require('path')

// 组件方法工具
const $component = [path.resolve(__dirname, 'src/plugins/component/index.js'), 'default']

module.exports = {
    productionSourceMap: false,
    lintOnSave: false,
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {
            sass: {
                additionalData: `@import "~@/styles/var.scss";@import "~@/styles/mixin.scss";`
            }
        }
    },
    // 注入全局对象
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $component,
            })
        ]
    }
}
