/**
 * Created by zhangrz on 9月16.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

// 产品

module.exports = DataTypes=>({
    fields: {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
        }, name: {
            type: DataTypes.STRING
            , allowNull: false
            , unique: true
            , comment: '产品名称'
        }, catalog_id: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: '分类编号'
        }, md5: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: 'MD5值'
        }, abstract: {
            type: DataTypes.STRING
            , allowNull: true
            , comment: '摘要'
        }, sequence: {
            type: DataTypes.INTEGER
            , allowNull: true
            , comment: '排序'
        }, tags: {
            type: DataTypes.STRING
            , allowNull: true
            , comment: '标签'
        }, img: {
            type: DataTypes.STRING
            , allowNull: true
            , comment: '图片地址'
        }, icon: {
            type: DataTypes.STRING
            , allowNull: true
            , comment: '缩略图地址'
        }, views: {
            type: DataTypes.INTEGER
            , allowNull: true
            , comment: '浏览次数'
        },rich_text:{
            type: DataTypes.STRING
            , allowNull: true
            , comment: '富文本'
        },text:{
            type: DataTypes.STRING
            , allowNull: true
            , comment: '纯文本'
        }
    }, tableName: 'production'
});
