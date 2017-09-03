/**
 * Created by zhangrz on 2017/9/1.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/* 管理人员表 */

module.exports = DataTypes=>({
    mod: {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
        }, login_name: {
            type: DataTypes.STRING
            , allowNull: false
            , unique: true
        }, name: {
            type: DataTypes.STRING
            , allowNull: false
        }, password: {
            type: DataTypes.STRING
            , allowNull: false
        }, salt: { // 加盐
            type: DataTypes.STRING
            , allowNull: false
        }
    }
});
