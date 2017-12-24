/**
 * Created by zhangrz on 2017/11/29.
 * Copyright© 2015-2020 CodingView (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const sequelize = require('../../utils/mysql').sequelize
    , News = require('../../models').news
    , newsService = {
    // 增: 新增新闻
    add: body=> new Promise((resolve, reject)=> {
        News.create(body)
            .then(r=>resolve(r))
            .catch(e=>reject(e));
    })

    // 删:新闻
    , del: id=>new Promise((resolve, reject)=> {
        News.findOne({where: {id}})
            .then(news=>news ? news.destroy() : reject('未找到对应的新闻'))
            .then(resolve)
            .catch(reject);
    })

    // 查：列表
    , list: ({offset, limit})=>new Promise((resolve, reject)=> {
        News.findAndCountAll({offset, limit})
            .then(result=> {
                const rows = result.rows;
                if (rows && rows instanceof Array && rows.length > 0) {
                    return resolve({data: rows, count: result.count});
                } else {
                    return resolve({data: [], count: 0});
                }
            })
            .catch(e=>reject(e));
    })

    // 查:列表+详情
    , homeList: ({offset, limit})=>new Promise((resolve, reject)=> {
        sequelize.query(`SELECT 
        news.id AS id,
        news.name AS name,
        example.abstract AS abstract,
        example.icon AS icon
        FROM news  
        LEFT JOIN example ON news.example_id = example.id
        ORDER BY news.created_at DESC
        LIMIT 0, 6`, {type: sequelize.QueryTypes.SELECT})
            .then(resolve)
            .catch(reject);
    })

    // 查:详情
    , detail: id=>new Promise((resolve, reject)=> {
        sequelize.query(`SELECT 
        news.id AS id,
        news.name AS name,
        example.rich_text AS rich_text,
        example.icon AS icon
        FROM news  
        LEFT JOIN example ON news.example_id = example.id
        WHERE news.id = ${id}`, {type: sequelize.QueryTypes.SELECT})
            .then(details=> {
                if (details && details instanceof Array && details.length > 0) {
                    resolve(details[0]);
                } else {
                    reject(GLO.error(details, -99, '获取数据出错'));
                }
            })
            .catch(reject);
    })

};

module.exports = newsService;
