/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/* 产品分类 */

let zTree; // ztree的实例

const Data = {
    // 获取分类列表
    catalogs: ()=>new Promise((resolve, reject)=>
        $.ajax({
            url: '/admin/production/catalog'
            , method: 'post'
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve(json.data);
                } else {
                    reject('message' in json ? json.message : '获取数据出错');
                }
            }, error: e=> {
                console.error(e);
                reject('请求超时');
            }
        })
    )
};

const Dom = {
    // zTree - 增加按钮
    addHoverDom: (treeId, treeNode)=> {
        let newCount = 1;
        const sObj = $('#' + treeNode.tId + '_span')
            , addBtn = $('#addBtn_' + treeNode.tId);
        if (treeNode.editNameFlag || addBtn.length > 0 || treeNode.grade === 2) {// 2级分类不能新增3级
            return false;
        } else {
            const addStr = '<span class="button add" id="addBtn_' + treeNode.tId
                + '" title="增加" onfocus="this.blur();"></span>';
            sObj.after(addStr);
            const btn = $('#addBtn_' + treeNode.tId);
            if (btn) {
                btn.bind('click', function () {
                    zTree.addNodes(treeNode, {
                        id: (100 + newCount)
                        , pId: treeNode.id
                        , name: 'new node' + (newCount++)
                    });
                    return false;
                });
            }
        }
    }

    // zTree - 隐藏增加按钮
    , removeHoverDom: (treeId, treeNode)=>$('#addBtn_' + treeNode.tId).unbind().remove()

    // 生成分类树
    , catalogs: ()=> {
        Data.catalogs()
            .then(catalogs=>
                zTree =
                    $.fn.zTree.init(
                        $('#production_catalog')
                        , {
                            view: {
                                addHoverDom: Dom.addHoverDom
                                , removeHoverDom: Dom.removeHoverDom
                                , selectedMulti: false
                            }, edit: {
                                enable: true
                                , removeTitle: '删除'
                                , renameTitle: '重命名'
                                // 禁止0级的重命名、删除
                                , showRenameBtn: (treeId, treeNode)=>!treeNode.noEditBtn
                                , showRemoveBtn: (treeId, treeNode)=>!treeNode.noEditBtn
                                // todo 拖拽
                                
                            }
                        }, [{
                            name: '产品分类'
                            , open: true
                            , children: catalogs
                            , noEditBtn: true
                        }])
            )
            .catch(e=>alert(e));
    }

    // 初始化
    , init: function () {
        this.catalogs();
    }
};

const Listener = {};

$(function () {
    Dom.init();
});
