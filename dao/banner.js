/**
 * Created by zhangrz on 2017/9/7.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/**
 * 广告位
 */
class Banner {
    /**
     * 构造函数
     * @param {number} bid 广告位编号
     */
    constructor(bid) {
        if (bid) {
            this.id = bid;
        }
    }

    /**
     * api转db数据
     * @param {object} banner
     * @return {Banner}
     */
    api2Db(banner) {
        if ('img' in banner) {
            this.image = banner.img;
        }
        this.description = banner.dcp;
        this.link = banner.href;
        this.sequence = parseInt(banner.seq);
        return this;
    }

    /**
     * 抛出api应用
     * @param {object} banner
     * @return {Banner}
     */
    db2Api(banner) {
        this.bid = banner.id;
        this.img = banner.image;
        this.dcp = banner.description;
        this.href = banner.link;
        this.seq = banner.sequence;
        return this;
    }
}

module.exports = Banner;
