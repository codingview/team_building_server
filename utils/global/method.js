/**
 * Created by zrz on 2017/4/27.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const _ = {
    md5: str=>require('crypto').createHash('md5').update(str).digest('hex')
};

// 标准方法
module.exports = {
    /**
     * nginx转发后获取实际IP信息
     * @param {object} req 请求参数
     * @return {string}
     */
    ip: req=> {
        let ip = req.get('x-forwarded-for'); // 获取代理前的ip地址
        if (ip && ip.split(',').length > 0) {
            ip = ip.split(',')[0];
        } else {
            ip = req.connection.remoteAddress;
        }
        const ipArr = ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g);
        return ipArr && ipArr.length > 0 ? ipArr[0] : '127.0.0.1';
    }

    // MD5
    , md5: _.md5

    // filename生成
    , filename: str => _.md5(str + new Date().getTime())
};
