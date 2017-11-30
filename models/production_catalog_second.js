/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created  产品分类
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
            , comment: '分类名称'
        }, first_catalog_id: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: '一级分类编号'
        }, sequence: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: '排序'
        }, icon: {
            type: DataTypes.STRING
            , comment: '分类图标'
        }, home_show: {
            type: DataTypes.BOOLEAN
            , comment: '是否展示到首页'
        }
    }, tableName: 'production_catalog_second'
    , option: {
        comment: '二级产品分类'
    }
});
