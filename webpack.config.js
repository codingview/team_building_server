/**
 * Created by zrz on 2017/8/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const path = require('path')
    , webpack = require('webpack')
    , BASE_URI = './public/javascript';

module.exports = {
    entry: {
        home: BASE_URI + '/home'
    }, output: {
        path: path.join(__dirname, 'public/src')
        , filename: '[name].min.js'
    }, module: {// 引用的组件
        rules: [{
            test: /\.js$/
            , exclude: /node_modules/
            , use: 'babel-loader'
        }]
    }, plugins: [
        new webpack.optimize.UglifyJsPlugin({ // 开启代码压缩
            compress: {
                warnings: false
            }
        })
    ]
};
