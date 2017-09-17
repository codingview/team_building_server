/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 产品分类

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
        }, grade: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: '分类等级'
        }, sequence: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: '排序'
        }, father_id: {
            type: DataTypes.INTEGER
            , allowNull: true
            , comment: '父分类编号'
        }, icon: {
            type: DataTypes.STRING
            , allowNull: true
            , comment: '分类图标'
        }
    }, tableName: 'production_catalog'
});
