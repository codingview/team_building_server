/**
 * Created by zrz on 2017/8/22.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const CONFIG = {
    development: require('./config_development')
    // , test: require('./config_test')
    // , production: require('./config_production')
};

module.exports = CONFIG[process.env.NODE_ENV || 'development'];
