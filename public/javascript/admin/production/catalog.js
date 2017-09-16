/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

class Node {
    constructor(node) {
        this.id = node.id;
        this.name = node.name;
        this.father_id = node.father_id;
        this.grade = node.grade;
        this.sequence = node.sequence;
    }
}

/* 产品分类 */

let zTree; // ztree的实例

const Data = {
    // 获取分类列表
    catalogs: require('./general').catalogs

    // 修改 - 分类名称
    , rename: catalog=>new Promise((resolve, reject)=>
            $.ajax({
                url: '/admin/production/catalog'
                , type: 'post'
                , data: catalog
                , dataType: 'json'
                , success: json=> {
                    if (json && 'status' in json && json.status > 0) {
                        resolve();
                    } else {
                        reject('message' in json ? json.message : '修改分类名称出错');
                    }
                }, error: e=> {
                    console.error(e);
                    reject('修改分类名称超时');
                }
            })
    )

    // 新增 - 分类
    , add: catalog=>new Promise((resolve, reject)=> {
        $.ajax({
            url: '/admin/production/catalog'
            , type: 'put'
            , data: catalog
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve();
                } else {
                    reject('message' in json ? json.message : '新增分类出错');
                }
            }, error: e=> {
                console.error(e);
                reject('新增分类名称超时');
            }
        })
    })

    // 删除 - 分类
    , remove: cid=>new Promise((resolve, reject)=> {
        $.ajax({
            url: '/admin/production/catalog'
            , type: 'delete'
            , data: {
                cid: cid
            }, dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve();
                } else {
                    reject('message' in json ? json.message : '新增分类出错');
                }
            }, error: e=> {
                console.error(e);
                reject('新增分类名称超时');
            }
        })
    })

};

const Dom = {
    // zTree - 增加按钮
    addHoverDom: (treeId, treeNode)=> {
        const sObj = $('#' + treeNode.tId + '_span')
            , ads = '#addBtn_' + treeNode.tId
            , addBtn = $(ads);
        if (treeNode.editNameFlag || addBtn.length > 0 || treeNode.grade === 2) {// 2级分类不能新增3级
            return false;
        } else {
            const addStr = '<span class="button add" id="addBtn_' + treeNode.tId
                + '" title="增加" onfocus="this.blur();"></span>';
            sObj.after(addStr);
            const btn = $(ads);
            if (btn) {
                btn.bind('click', function () {
                    const parentNode = treeNode.getParentNode() // 父节点
                        , childNode = treeNode.children // 子节点
                        , id = (( parentNode ? parentNode.getIndex() : 1) + 1) * 100 + (childNode ? childNode.length + 1 : 0);
                    // todo 根据level生成不同的id
                    zTree.addNodes(treeNode, {
                        id: id
                        , pId: treeNode.id
                        , name: '新的分类' + id
                        // todo 新增的3级分类不能有新增按钮
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
                            }, callback: {
                                onNodeCreated: (event, treeId, treeNode)=> {
                                    if (!('sequence' in treeNode) && treeNode.level !== 0) {// todo 区分初始化创建而不是新增
                                        const parentNode = treeNode.getParentNode()
                                            , newNode = {
                                                name: treeNode.name
                                                , grade: treeNode.level
                                                , father_id: (parentNode ? parentNode.id : 0)
                                                , sequence: treeNode.getIndex() || 0
                                                , icon: '' // todo 默认无图标
                                            };
                                        Data.add(newNode);
                                    }
                                }, beforeRemove: (treeId, treeNode)=> {
                                    if (treeNode.level === 2) {
                                        Data.remove(treeNode.id);
                                    } else if (treeNode.children && treeNode.children.length > 0) {
                                        // 删除时，2级分类要同时删除3级分类
                                        alert('该分类下有子分类');
                                        return false;
                                    } else {
                                        Data.remove(treeNode.id);
                                    }
                                }, onRename: (event, treeId, treeNode, isCancel)=> {
                                    if (treeNode.name) {
                                        Data.rename(new Node(treeNode));
                                    } else {
                                        alert('请填写分类名称');
                                        return false;
                                    }
                                }
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

const Listener = {

    // 初始化监听
    init: function () {
    }
};

$(function () {
    Dom.init();
    Listener.init();
});
