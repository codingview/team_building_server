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
    // 获取文档名称列表
    , getFilesName =
        new Promise((resolve, reject)=>
            fs.readdir(path.join(__dirname), (err, files)=> {
                if (err) {
                    reject(err);
                } else { // 读取文件列表后移除index.js
                    resolve(_.remove(files, file=>file !== 'index.js'));
                }
            }))
    // 依次读取文档内容,构造model
    , files2Model = files=> {
        console.info(222, files)
        let models = {};
        files.forEach(fileName=> {
            const model = require(path.join(__dirname, fileName))(mysql.Sequelize);
            models[model.tableName] = mysql.sequelize.define(model.tableName, model.fields);
        });
        return models;
    }, init = ()=> {
        getFilesName
            .then(files=>files2Model(files))
            .then(models=>models)
            .catch(e=>console.error(e))
        ;
    };

module.exports = init();
