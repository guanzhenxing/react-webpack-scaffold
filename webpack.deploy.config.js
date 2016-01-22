var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'eval',
    entry: {
        app: [
            './src/index'
        ],
        vendors: ['crypto-js', 'history', 'humps', 'jquery', 'lodash', 'normalizr', 'object-assign', 'q', 'react', 'react-dom', 'underscore']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', '[name].[hash].js'),
        new ExtractTextPlugin('app.[contenthash].css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'DEMO',
            template: 'index-template.html',
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        })
    ],
    resolve: {
        modulesDirectories: [
            'node_modules'
        ]
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel?optional[]=runtime'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css$/,
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'src/static/style')
            ],
            loader: ExtractTextPlugin.extract('style', 'css?modules!autoprefixer?{browsers:["> 5%", "ie 9"]}')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?autoprefixer?{browsers:["> 5%", "ie 9"]}')
        }, {
            test: /\.(svg|png|jpg|jpeg|gif)$/i,
            loaders: ['file']
        }]
    }
};
