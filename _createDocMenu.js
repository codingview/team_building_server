/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

let max = 0; // 最大目录深度

const fs = require('fs')
    , path = require('path')
    , config = {
    ignore: ['node_modules', '.git', '.idea'] // 忽略的文件夹或文件名
}, _ = {
    /**
     * 读取文件夹列表
     * @param {String} filePath 当前路径
     * @param {Array} homePath 父路径
     * @return {Array} homePath
     */
    readFiles: (filePath, homePath)=> {
        const files = fs.readdirSync(filePath);
        files.forEach(file=> {
            const _path = path.join(filePath, file);
            if (config.ignore.indexOf(file) < 0) { // 忽略目录
                if (fs.lstatSync(_path).isDirectory()) { // 是否为文件夹
                    homePath.push({
                        path: _path
                        , type: 'folder'
                        , children: _.readFiles(_path, [])
                    });
                } else {
                    homePath.push({
                        path: _path
                        , type: 'file'
                    });
                }
            } else {
                homePath.push({
                    path: _path
                    , type: 'file'
                });
            }
        });
        return homePath;
    }


    /**
     * 数组转树
     * @param {Array} arr
     * @param {String} str
     * @return {*}
     */
    , arr2Tree: (arr, str)=> {
        arr.forEach(file=> {
            if (file.type === 'file') {
                const len = file.path.split('\\').length + 1;
                if (len > max) {
                    max = len;
                }
            } else {
                _.arr2Tree(file.children, '');
            }
        });
        return str;
    }

    , ll: (num, s = '')=> {
        let str = '';
        for (let i = 0; i < num; i++) {
            str += '|' + s;
        }
        return str;
    }

    , tree2md: (arr, str)=> {
        arr.forEach(file=> {
            if (file.type === 'file') {
                const line = '|' + file.path.replace(/\\/g, '|') + '|'
                    , lStr = line.split('|')
                    , len = lStr.length;
                str += _.ll(len - 2) + lStr[len - 2] + _.ll(max - len) + '\n';
            } else {
                const line = '|' + file.path.replace(/\\/g, '|') + '|'
                    , len = line.split('|').length;
                str += line + _.ll(max - len) + '\n';
                str += _.tree2md(file.children, '');
            }
        });
        return str;
    }
};

const run = ()=> {
    const files = _.readFiles('./', []);
    _.arr2Tree(files, '');
    let md = _.tree2md(files, '');
    md = _.ll(max, '---') + '|\n' + _.ll(max, '---') + '|\n' + md;
    fs.writeFile(path.join(__dirname, './doc/menu.md'), md);
};

run();
