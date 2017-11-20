/**
 * Created by zhangrz on 2017/9/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 服务案例
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
            , comment: '新闻标题'
        }, case_id: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: '案例编号'
        }, sequence: {
            type: DataTypes.INTEGER
            , allowNull: false
            , comment: '排序序号'
        }
    }, tableName: 'case'
});
