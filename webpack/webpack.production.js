const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const argv = require('yargs-parser')(process.argv.slice(2));

console.log(argv.mode);

module.exports = merge(common,{
    mode:"production",
    // devtool:"source-map",
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].min.js",
        library: "leCheckout",
        libraryTarget: "umd",
        libraryExport: 'default',
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: "checkout.html",
            template: "./src/origin/ejs/pcCheckout.ejs",
            minify: false,
            mode: argv.mode,
            inject: false,
            chunks:["checkout"]
        }),
        new HtmlWebpackPlugin({
            filename: "mcheckout.html",
            template: "./src/origin/ejs/mCheckout.ejs",
            minify: false,
            mode: argv.mode,
            inject: false,
            chunks:["mcheckout"]
        }),
        new HtmlWebpackPlugin({
            filename: "tcheckout.html",
            template: "./src/origin/ejs/tCheckout.ejs",
            minify: false,
            mode: argv.mode,
            inject: false,
            chunks:["tcheckout"]
        }),
        new CleanWebpackPlugin(),
        new SimpleProgressWebpackPlugin()
    ]
})