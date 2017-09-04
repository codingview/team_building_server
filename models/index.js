/**
 * Created by zhangrz on 2017/9/1.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 表名及表字段均使用 _ 进行连接

const mysql = require('../utils/model/mysql')
    , fs = require('fs')
    , path = require('path')
    , _ = require('lodash')
    , files2Model = // 依次读取文档内容,构造model
    ()=> {
        // 获取文档名称列表
        const filesList = _.remove(fs.readdirSync(path.join(__dirname)), file=>file !== 'index.js');
        let models = {};
        filesList.forEach(fileName=> {
            const model = require(path.join(__dirname, fileName))(mysql.Sequelize);
            models[model.tableName] = mysql.sequelize.define(model.tableName, model.fields);
        });
        return models;
    };

module.exports = files2Model();
