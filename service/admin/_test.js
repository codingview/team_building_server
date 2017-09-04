/**
 * Created by zhangrz on 2017/9/4.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const login = require('./login');

login('admin', '1234536')
    .then(r=>console.info(r))
    .catch(e=>console.error(e));
