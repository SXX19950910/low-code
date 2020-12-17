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
}
