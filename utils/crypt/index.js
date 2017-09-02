/**
 * Created by zrz on 2017/9/3.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Bcrypt = require('bcrypt');

module.exports = {
    /**
     * 加盐 - 加密
     * @param {string} password  明文
     * @return {{pwd, salt}}     密文+盐
     */
    encode: password=> {
        const salt = Bcrypt.genSaltSync(10)
            , pwd = Bcrypt.hashSync(password, salt);
        return {pwd, salt};
    }

    /**
     * 比对 - 密文
     * @param {string} password      明文
     * @param {string} pwd           密文
     */
    , equal: (password, pwd)=>Bcrypt.compareSync(password, pwd)
};

