import React, {useEffect, useState} from 'react';
import {Column} from 'primereact/column';
import axios from "axios";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {useStore} from "react-hookstore";
import {InputText} from "primereact/inputtext";
import {FilterMatchMode} from "primereact/api";

export const Activities = () => {
    const [connectionTree, setConnectionTree] = useStore("connectionTree");

    const [historyData, setHistoryData] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState([]);
    const [filters, setFilters] = useState(null);
    // const [selectedSessions, setSelectedSessions] = useState([]);



    useEffect(() => {
        getHistory();
        initFilters1();
    },[]);



    function getHistory(){
        axios({
            method: 'get',
            url: 'http://35.156.183.138:8080/guacamole/api/session/data/'+localStorage.getItem('dataSource')+'/history/connections?contains=guac&order=-startDate',
            params : {
                'token': localStorage.getItem('token')
            }
        }).then(function (response) {
            if(response.status===200 && response.data){
                let objValues = Object.values(response.data);

                objValues?.forEach(function (el,index){
                    el.index = index;
                    let item = filterArr(connectionTree, el.connectionIdentifier);
                    if(item?.length===1 && item[0]?.data?.name){
                        el.connectionName = item[0]?.data?.name;
                    }

                })
                setHistoryData(objValues);
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

    function dateFormatFromEpoch(rowData){
        return ((new Date(rowData.startDate)).toISOString().slice(0, 10) + ' ' + (new Date(rowData.startDate)).toLocaleTimeString());
    }

    const dateTemplate = (rowData) => {
        return rowData?dateFormatFromEpoch(rowData):null;
    }

    const durationTemplate = (rowData) => {
        const sec = (((new Date(rowData.endDate))-(new Date(rowData.startDate))) / 1000);
        if(sec<60){
            return sec.toString()+' seconds';
        }
        else if(sec<3600){
            return Number((sec/60).toFixed(1)).toString()+' minutes';

        }
        else{
            return Number((sec/3600).toFixed(1)).toString()+' hours';

        }
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
                    <DataTable value={historyData}  dataKey="index" paginator responsiveLayout="scroll" filters={filters} filterDisplay="menu"
                               globalFilterFields={['username', 'connectionName', 'remoteHost']} header={header} emptyMessage="No activities found."
                               paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={20} rowsPerPageOptions={[10,20,50]}>
                        <Column field="username" header="Username"></Column>
                        <Column body={dateTemplate} header="Active since"></Column>
                        <Column body={durationTemplate} header="Duration"></Column>
                        <Column field="connectionName" header="Connection name"></Column>
                        <Column field="remoteHost" header="Remote Host"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}
