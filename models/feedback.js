/**
 * Created by zhangrz on 2017/9/18.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
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
            , comment: '反馈者姓名'
        }, phone: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: '反馈者手机号码'
        }, state: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: '处理状态'
        }, icon: {
            type: DataTypes.STRING
            , allowNull: true
            , comment: '留言内容'
        }, ip: {
            type: DataTypes.STRING
            , allowNull: true
            , comment: '提交反馈的IP'
        }
    }, tableName: 'feedback'
});
