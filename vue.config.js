module.exports = {
    lintOnSave: false,
    publicPath: './',
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true
        // useLocalIp: true
    },
    configureWebpack: {
        devtool: "inline-source-map"
    },
    css: {
        extract: false
    }
};
