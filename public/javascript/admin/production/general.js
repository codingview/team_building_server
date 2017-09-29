/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

module.exports = {
    // 获取分类列表
    catalogs: ()=>new Promise((resolve, reject)=>
        $.ajax({
            url: '/admin/production/catalog/list'
            , type: 'get'
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve(json.data);
                } else {
                    reject('message' in json ? json.message : '获取分类列表出错');
                }
            }, error: e=> {
                console.error(e);
                reject('获取分类列表超时');
            }
        })
    )

    // 生成分类列表
    , setCatalogs: catalogs=> {
        let str = '';
        const cid = parseInt($('#p_catalog_id_val').val());
        catalogs.forEach(catalog=> {
            str += `<optgroup label="${catalog.name}">`;
            if ('children' in catalog && catalog.children instanceof Array && catalog.children.length > 0) {
                catalog.children.forEach(child=> {
                    str += `<option value="${child.id}" ${child.id === cid ? 'selected' : ''}>${child.name}</option>`;
                });
            }
            str += '</optgroup>';
        });
        return str;
    }

    // 生成分类列表名称:编号kv结构
    , setCatalogsKv: catalogs=> {
        let _ = {};
        catalogs.forEach(catalog=> {
            _[catalog.id] = catalog.name;
            if (catalog.children) {
                catalog.children.forEach(child=> {
                    _[child.id] = child.name;
                });
            }
        });
        return _;
    }
};
