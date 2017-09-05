/**
 * Created by zhangrz on 2017/9/5.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 通用配置数据变量

module.exports = DataTypes=>({
    fields: {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
        }, param: {
            type: DataTypes.STRING
            , allowNull: false
            , unique: true
        }, value: {
            type: DataTypes.STRING
            , allowNull: false
        }
    }, tableName: 'general_option'
});
