/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const catalog = require('./catalog');

catalog.catalogList()
    .then(r=>console.info(JSON.stringify(r)))
    .catch(e=>console.error(e));
