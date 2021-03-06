/**
 * Created by zhangrz on 2017/9/7.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

module.exports = {
    // 管理员
    admin: require('./admin')

    // 广告位
    , banner: require('./banner')

    // 产品
    , production: require('./production')

    // 反馈
    , feedback: require('./feedback')

    // 案例
    , example: require('./example')

    // 资源
    , resource: require('./resource')
};
