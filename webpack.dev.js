const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './build',
        port: 4000
    },
    optimization: {
        usedExports: true,
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ]
});