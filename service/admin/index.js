/**
 * Created by zhangrz on 2017/8/31.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 服务 - 管理员
module.exports = {
    // 增加 - 管理员
    add: require('./add')

    // 删除 - 管理员
    , del: require('./del')

    // 登录 - 管理员
    , login: require('./login')

    // 查询 - 管理员
    , query: require('./query')

    // 修改 - 管理员
    , update: require('./update')
};
