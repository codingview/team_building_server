/**
 * Created by zhangrz on 2017/9/1.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/* 管理人员表 */

module.exports = DataTypes=>({
    fields: {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
        }, login_name: {
            type: DataTypes.STRING
            , allowNull: false
            , unique: true
            , comment: '登录账号'
        }, name: {
            type: DataTypes.STRING
            , allowNull: false
            , comment: '显示名称'
        }, password: {
            type: DataTypes.STRING
            , allowNull: false
            , comment: '密码'
        }, salt: { // 加盐
            type: DataTypes.STRING
            , allowNull: false
            , comment: '盐'
        }
    }, tableName: 'admin'
});
