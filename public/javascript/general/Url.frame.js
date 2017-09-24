/**
 * Created by zhangrz on 2017/9/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created url解析
 */

'use strict';

module.exports = {
    get: name => {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
            , r = window.location.search.substr(1).match(reg);
        return r != null ? decodeURI(r[2]) : null;
    }
    /**
     * 设置url中get参数
     * 根据参数列表长度进行判断
     * @returns {string}
     */
    , set: function () {
        const changeURLKeyValue = (url, arg, arg_val)=> {
            const pattern = arg + '=([^&]*)'
                , replaceText = arg + '=' + arg_val;
            if (url.match(pattern)) {
                let tmp = '/(' + arg + '=)([^&]*)/gi';
                tmp = url.replace(eval(tmp), replaceText);
                return tmp;
            } else {
                if (url.match('[\?]')) {
                    return url + '&' + replaceText;
                } else {
                    return url + '?' + replaceText;
                }
            }
        };
        if (arguments.length === 1 && typeof arguments[0] === 'object') { // 一个对象，使用key标记value
            const obj = arguments[0];
            let search = location.search;
            for (const o in obj) {
                if (obj.hasOwnProperty(o)) {
                    search = changeURLKeyValue(search, o, obj[o]);
                }
            }
            history.pushState(null, document.title, search);
        } else if (arguments.length === 2) { // key+value
            const key = arguments[0]
                , value = arguments[1];
            history.pushState(null, document.title, changeURLKeyValue(location.toString(), key, value));
        }
    }
};
