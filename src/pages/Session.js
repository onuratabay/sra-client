import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../service/NodeService';
import axios from "axios";

export const Session = () => {

    const [connectionTree, setConnectionTree] = useState([]);

    const datt = [
                {
                    "key": "0",
                    "data":{
                        "name":"Applications",
                        "size":"100kb",
                        "type":"Folder"
                    },
                    "children":[
                        {
                            "key": "0-0",
                            "data":{
                                "name":"React",
                                "size":"25kb",
                                "type":"Folder"
                            },
                            "children":[
                                {
                                    "key": "0-0-0",
                                    "data":{
                                        "name":"react.app",
                                        "size":"10kb",
                                        "type":"Application"
                                    }
                                },
                                {
                                    "key": "0-0-1",
                                    "data":{
                                        "name":"native.app",
                                        "size":"10kb",
                                        "type":"Application"
                                    }
                                },
                                {
                                    "key": "0-0-2",
                                    "data":{
                                        "name":"mobile.app",
                                        "size":"5kb",
                                        "type":"Application"
                                    }
                                }
                            ]
                        },
                        {
                            "key": "0-1",
                            "data":{
                                "name":"editor.app",
                                "size":"25kb",
                                "type":"Application"
                            }
                        },
                        {
                            "key": "0-2",
                            "data":{
                                "name":"settings.app",
                                "size":"50kb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {
                    "key": "1",
                    "data":{
                        "name":"Cloud",
                        "size":"20kb",
                        "type":"Folder"
                    },
                    "children":[
                        {
                            "key": "1-0",
                            "data":{
                                "name":"backup-1.zip",
                                "size":"10kb",
                                "type":"Zip"
                            }
                        },
                        {
                            "key": "1-1",
                            "data":{
                                "name":"backup-2.zip",
                                "size":"10kb",
                                "type":"Zip"
                            }
                        }
                    ]
                },
                {
                    "key": "2",
                    "data": {
                        "name":"Desktop",
                        "size":"150kb",
                        "type":"Folder"
                    },
                    "children":[
                        {
                            "key": "2-0",
                            "data":{
                                "name":"note-meeting.txt",
                                "size":"50kb",
                                "type":"Text"
                            }
                        },
                        {
                            "key": "2-1",
                            "data":{
                                "name":"note-todo.txt",
                                "size":"100kb",
                                "type":"Text"
                            }
                        }
                    ]
                },

            ];
    let arrr=[
        // {
        //     "key": "0",
        //     "data":{
        //     },
        //     "children":[
        //
        //     ]
        // },
    ];
    useEffect(() => {

        axios({
            method: 'post',
            url: 'http://35.156.183.138:8080/guacamole/api/tokens',
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization:
                        'Basic ' +
                        Buffer.from(`${'guacadmin'}:${'guacadmin'}`, 'binary').toString('base64'),
                }
        }).then(function (response) {
                console.log(response,'RESSSSS');
                if(response.status===200){
                    localStorage.setItem('token',response.data.authToken)
                    localStorage.setItem('dataSource',response.data.dataSource)
                    localStorage.setItem('username',response.data.username)

                    let connectionAndGroupUrl = 'http://35.156.183.138:8080/guacamole/api/session/data/'+response.data.dataSource+'/connectionGroups/ROOT/tree';
                    axios({
                        method: 'get',
                        url: connectionAndGroupUrl,
                        params : {
                            'token': response.data.authToken
                        }
                    }).then(function (response) {
                        console.log(response,'SESS');
                        if(response.status===200 && response.data){
                            treList(response.data);
                        }

                    }).catch((error) => {
                        console.log(error,'ERRR');
                    })
                }
            }).catch((error) => {
            console.log(error,'ERRR');
        })

    },[]);


    function onRowClick(e){
        console.log(e.node)
    }

    function tree(root){

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
        console.log(treeNode,'TREE NODE')
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
                                        console.log(el3, 'EL 3')
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



    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>Session</h5>
                    <TreeTable value={connectionTree} header="Sessions" onRowClick={(e)=>onRowClick(e)}>
                        <Column field="name" header="Name" expander></Column>
                        <Column field="size" header="Size"></Column>
                        <Column field="type" header="Type"></Column>
                    </TreeTable>
                </div>
            </div>
        </div>
    )
}
