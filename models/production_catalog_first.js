/**
 * Created by zhangrz on 2017/11/30.
 * Copyright© 2015-2020 CodingView (https://github.com/codingview)
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
            , comment: '分类名称'
        }, sequence: {
            type: DataTypes.INTEGER
            , comment: '排序'
        }, icon: {
            type: DataTypes.STRING
            , comment: '分类图标'
        }, home_show: {
            type: DataTypes.BOOLEAN
            , comment: '是否展示到首页'
        }
    }, tableName: 'production_catalog_first'
    , option: {
        comment: '一级产品分类'
    }, associations: models=> {
        models.production_catalog_first.hasMany(
            models.production_catalog_second
            , {
                foreignKey: 'first_catalog_id'
                , sourceKey: 'id'
                , as: 'second'
            }
        );
        models.production_catalog_second.belongsTo(
            models.production_catalog_first
            , {
                foreignKey: 'first_catalog_id'
                , targetKey: 'id'
            }
        );
    }
});
