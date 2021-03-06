import React, {useEffect, useState} from 'react';
import {Column} from 'primereact/column';
import axios from "axios";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {useStore} from "react-hookstore";
import {InputText} from "primereact/inputtext";
import {FilterMatchMode} from "primereact/api";

export const ActiveSession = () => {
    const [connectionTree, setConnectionTree] = useStore("connectionTree");

    const [activeSessions, setActiveSessions] = useState([]);
    const [selectedSessions, setSelectedSessions] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState([]);
    const [filters, setFilters] = useState(null);



    useEffect(() => {
        getActiveSessions();
        initFilters1();
    },[]);

    useEffect(() => {
        console.log(activeSessions,'patch kill session')
    },[activeSessions]);


    function getActiveSessions(){
        axios({
            method: 'get',
            url: 'http://35.156.183.138:8080/guacamole/api/session/data/'+localStorage.getItem('dataSource')+'/activeConnections',
            params : {
                'token': localStorage.getItem('token')
            }
        }).then(function (response) {
            if(response.status===200 && response.data){
                // for (let data in response.data) {
                //     if (response.data.hasOwnProperty(data)) {
                //         tempData.push(data);
                //     }
                // }
                let objValues = Object.values(response.data);

                objValues?.forEach(function (el,index){
                    el.index = index;
                        let item = filterArr(connectionTree, el.connectionIdentifier);
                        console.log(item,'ITEM',el.connectionIdentifier)
                        if(item?.length===1 && item[0]?.data?.name){
                            el.connectionName = item[0]?.data?.name;
                        }

                })
                setActiveSessions(objValues);
            }

        }).catch((error) => {
            console.log(error,'ERRR');
        })
    }

    function filterArr(arr, selectedKey) {
        return arr.filter(item => Number(item.identifier) === Number(selectedKey) && Number(item?.data?.activeConnections)>0).map(item => {
            item = Object.assign({}, item)
            if (item.children) {
                item.children = filterArr(item.children, selectedKey)
            }
            return item
        })
    }


    function onSelectionChange(e){
        setSelectedSessions(e.value)
        console.log(e.value,'SELECTION')
    }

    function onClickKillSession(e){
        let dataArr=[];
        let obj = {
            "op": "remove",
            "path": null
        };
        if(selectedSessions?.length>0){
            selectedSessions?.forEach(function (el){
                let bodyObj = Object.assign({},obj);
                bodyObj.path = "/".concat(el.identifier.toString());
                dataArr.push(bodyObj);
            });
        }
        console.log(dataArr,'DATA ARR')

        axios({
            method: 'patch',
            url: 'http://35.156.183.138:8080/guacamole/api/session/data/'+localStorage.getItem('dataSource')+'/activeConnections',
            params : {
                'token': localStorage.getItem('token')
            },
            data : dataArr
        }).then(function (response) {
            if(response.status===200 && response.data){
                getActiveSessions();
            }

        }).catch((error) => {
            console.log(error,'ERRR');
        })
    }

    const dateTemplate = (rowData) => {
        return rowData?((new Date(rowData.startDate)).toISOString().slice(0, 10) + ' ' + (new Date(rowData.startDate)).toLocaleTimeString()):null;
    }


    const renderHeader1 = () => {
        return (
            <div className="p-d-flex p-jc-between">
                {/*<Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} />*/}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Filter" />
                </span>
            </div>
        )
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters };
        _filters1['global'].value = value;

        setFilters(_filters1);
        setGlobalFilterValue(value);
    }

    const initFilters1 = () => {
        setFilters({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        });
        setGlobalFilterValue('');
    }

    const header = renderHeader1();

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>Current Connections</h5>
                    <DataTable value={activeSessions} selection={selectedSessions} onSelectionChange={e => onSelectionChange(e)} dataKey="index" paginator responsiveLayout="scroll" filters={filters} filterDisplay="menu"
                               globalFilterFields={['username', 'connectionName', 'remoteHost']} header={header} emptyMessage="No active session found."
                               paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={20} rowsPerPageOptions={[10,20,50]}>
                        <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
                        <Column field="username" header="Username"></Column>
                        <Column field="startDate" header="Active since" body={dateTemplate}></Column>
                        <Column field="remoteHost" header="Remote Host"></Column>
                        <Column field="connectionName" header="Connection name"></Column>
                    </DataTable>
                </div>
            </div>
            <div className="p-col-12 "><Button label="Kill Connections" onClick={onClickKillSession}></Button></div>
        </div>
    )
}
