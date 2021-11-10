import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../service/NodeService';
import axios from "axios";
import {createStore, useStore} from "react-hookstore";
import {Button} from "primereact/button";

export const Session = () => {

    const [connectionTree, setConnectionTree] = useStore("connectionTree");


    useEffect(() => {

        // let connectionAndGroupUrl = 'http://35.156.183.138:8080/guacamole/api/session/data/' + localStorage.getItem('dataSource') + '/connectionGroups/ROOT/tree';
        // axios({
        //     method: 'get',
        //     url: connectionAndGroupUrl,
        //     params: {
        //         'token': localStorage.getItem('token')
        //     }
        // }).then(function (response) {
        //     if (response.status === 200 && response.data) {
        //         treList(response.data);
        //     }
        //
        // }).catch((error) => {
        //     console.log(error, 'ERRR');
        // })


    }, []);


    function onRowClick(e){
        console.log(e.node)
    }

    function treList(oldTree){

        let treeNode = [];
        let totalGroupIndex = 0;
        if(oldTree.childConnectionGroups?.length>0){
            oldTree.childConnectionGroups?.forEach((el,index)=>{
                totalGroupIndex = totalGroupIndex+1;
                let obj = getTreeObj(el,'',index);
                if(obj.children?.length>0){
                    let children = buildGroupLeafs(obj,index);
                    obj.children = children;
                }

                treeNode.push(obj);



                // if(el.childConnectionGroups?.length>0){
                //     el.childConnectionGroups?.forEach((el,index)=>{
                //         treeNode.push(getTreeObj(el,'',index));
                //     })
                // }
                // if(el.childConnections?.length>0){
                //     el.childConnections?.forEach((el,index)=>{
                //         treeNode.push(getTreeObj(el,'',index));
                //     })
                // }

            });
        }

        if(oldTree.childConnections?.length>0){
            oldTree.childConnections?.forEach((el,index)=>{
                treeNode.push(getTreeObj(el,'',index+totalGroupIndex));
            });
        }
        setConnectionTree(treeNode);
    }

    function getTreeObj(data,parentKey,key){
        let list = [];
        if(data?.childConnectionGroups?.length>0){
            data?.childConnectionGroups?.forEach(function (el){
                list.push(el);
            })
        }
        if(data?.childConnections?.length>0){
            data?.childConnections?.forEach(function (el){
                list.push(el);
            })
        }

        let obj = {data:{}};
        // obj.key = Object.assign('',parentKey);
        // if(parentKey === '1')
        //     debugger;
        // if(data.name === '213rearaw')
        //     debugger
        obj.key = parentKey?.toString().length>0 ? parentKey.toString().concat('-').concat(key):key.toString();
        obj.identifier = data.identifier;
        obj.data = data;
        obj.children = list?.length>0 ? list : [];
        return obj;
    }

    function buildGroupLeafs(oldTree,level){
        let treeNode = [];
        if(oldTree.children?.length>0){
            oldTree.children?.forEach((el,index)=>{
                treeNode.push(getTreeObj(el,level.toString(),index));
            });
        }
        let leafTreeNode = [];
        if(treeNode?.length>0){
            treeNode?.forEach(function (el,index){
                if(el?.children?.length>0){
                    let elChildrenKey = level.toString()?.concat(('-').concat(index?.toString()));
                    el.children?.forEach((el,index)=>{
                        leafTreeNode.push(getTreeObj(el,elChildrenKey,index));
                    });
                    el.children = leafTreeNode;
                    let leafLeaf = [];
                    if(el.children?.length>0){
                        el.children?.forEach(function (el2,index){
                            if(el2?.children?.length>0){
                                el2.children?.forEach((el3,index)=>{
                                    let el3ChildrenKey = elChildrenKey?.concat(('-')?.concat(index?.toString()));
                                    leafLeaf.push(getTreeObj(el3,el3ChildrenKey,index));
                                });
                                el2.children = leafLeaf;
                                el2.children?.forEach((el3, index) => {
                                    if (el3?.children?.length > 0) {
                                        let leafLeafLeaf = [];
                                        el3.children?.forEach((el4, index) => {
                                            leafLeafLeaf.push(getTreeObj(el4, elChildrenKey?.concat(('-')?.concat(index?.toString()))?.concat(('-')?.concat(index?.toString())), index));
                                        })
                                        el3.children = leafLeafLeaf;
                                        leafLeafLeaf = Object.assign([], []);
                                    }
                                })
                                leafLeaf = Object.assign([],[]);
                            }
                        })
                    }
                    leafTreeNode = Object.assign([],[]);
                }
            })
        }



        return treeNode;
    }

    function typeTemplate(node,column){
        return <div>
            {node.data?.protocol ? node.data?.protocol : node.data?.type}
        </div>;
    }

    function actionTemplate(node,column){
        return <div>
            {node.data?.protocol&&<a className="p-button p-col" style={{background:"#18242FFF"}} href="">Connect</a>}
        </div>;
    }

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>My Connection</h5>
                    <TreeTable value={connectionTree} header="Sessions" onRowClick={(e)=>onRowClick(e)}>
                        <Column field="name" header="Name" expander></Column>
                        <Column body={typeTemplate} header="Type"></Column>
                        <Column body={actionTemplate} header="Actions"></Column>
                    </TreeTable>
                </div>
            </div>
        </div>
    )
}
