/**
 * Created by zrz on 2016/8/30.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 1.0.0 created
 */

'use strict';
exports = (function () {
    Date.prototype.format = function (format) {
        let o = {
            'M+': this.getMonth() + 1 // month
            , 'd+': this.getDate() // day
            , 'h+': this.getHours() // hour
            , 'm+': this.getMinutes() // minute
            , 's+': this.getSeconds() // second
            , 'w+': this.getDay()// week
            , 'q+': Math.floor((this.getMonth() + 3) / 3) // quarter
            , 'S': this.getMilliseconds() // millisecond
        };
        if (/(y+)/.test(format)) {// year
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1
                    , RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return format;
    };
}());
