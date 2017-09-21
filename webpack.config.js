/**
 * Created by zrz on 2017/8/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const path = require('path')
    , webpack = require('webpack')
    , BASE_URI = {
    web: './public/javascript/web'
    , admin: './public/javascript/admin'
};

module.exports = {
    entry: {
        'home': BASE_URI.web + '/home'
        , 'about': BASE_URI.web + '/about'

        , 'login.admin': BASE_URI.admin + '/login'
        , 'banner.home.admin': BASE_URI.admin + '/home/banner'

        , 'user.option.admin': BASE_URI.admin + '/option/user'
        , 'feedback.option.admin': BASE_URI.admin + '/option/feedback'

        , 'production.admin': BASE_URI.admin + '/production'
        , 'add.production.admin': BASE_URI.admin + '/production/add'
        , 'catalog.production.admin': BASE_URI.admin + '/production/catalog'

        , 'about.admin': BASE_URI.admin + '/about'
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
