/**
 * Created by zhangrz on 2017/9/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 服务案例分类
 */

'use strict';

module.exports = DataTypes=>({
    fields: {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
        }, name: {
            type: DataTypes.STRING
            , allowNull: false
            , unique: false
            , comment: '分类名称'
        }, sequence: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: '排序'
        }, icon: {
            type: DataTypes.STRING
            , allowNull: true
            , comment: '分类图标'
        }, type: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: '分类所属类型: 1 服务案例; 2 基地资源;'
        }
    }, tableName: 'general_catalog' // 通用分类列表
});
