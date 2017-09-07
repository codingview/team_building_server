/**
 * Created by zhangrz on 2017/9/7.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 广告位

module.exports = DataTypes=>({
    fields: {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
        }, image: {
            type: DataTypes.STRING
            , allowNull: false
            , comment: '图片地址'
        }, description: {
            type: DataTypes.STRING
            , comment: '描述'
        }, href: {
            type: DataTypes.STRING
            , allowNull: false
            , comment: '跳转链接'
        }
    }, tableName: 'banner'
});
