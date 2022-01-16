import React, {useEffect, useState} from 'react';
import {Column} from 'primereact/column';
import axios from "axios";
import {DataTable} from "primereact/datatable";
import {InputText} from "primereact/inputtext";
import {FilterMatchMode} from "primereact/api";
import {Button} from "primereact/button";
import {Redirect} from "react-router-dom";

export const Users = () => {
    const [redirect, setRedirect] = useState(false);

    const [data, setData] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState([]);
    const [filters, setFilters] = useState(null);



    useEffect(() => {
        getUserData();
        initFilters1();
    },[]);



    function getUserData(){
        axios({
            method: 'get',
            url: 'http://35.156.183.138:8080/guacamole/api/session/data/'+localStorage.getItem('dataSource')+'/users',
            params : {
                'token': localStorage.getItem('token')
            }
        }).then(function (response) {
            if(response.status===200 && response.data){
                console.log(response)
                console.log(response.data)
                let objValues = Object.values(response.data);
                console.log(objValues)
                setData(objValues);
            }

        }).catch((error) => {
            console.log(error,'ERRR');
        })
    }

    function dateFormatFromEpoch(rowData){
        console.log(rowData.username)
        console.log((new Date(rowData.lastActive)))
        return ((new Date(rowData.lastActive)).toISOString().slice(0, 10) + ' ' + (new Date(rowData.lastActive)).toLocaleTimeString());
    }

    const dateTemplate = (rowData) => {
        return rowData?.lastActive?dateFormatFromEpoch(rowData):null;
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

    function saveUser(){
        setRedirect(true);
    }

    const header = renderHeader1();

    if (redirect)
        return <Redirect push to="/saveUser"/>

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>Users</h5>
                    <DataTable value={data}  dataKey="index" paginator responsiveLayout="scroll" filters={filters} filterDisplay="menu"
                               globalFilterFields={['username', 'attributes.guac-organization', 'attributes.guac-full-name']} header={header} emptyMessage="No users found."
                               paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={20} rowsPerPageOptions={[10,20,50]}>
                        <Column field="username" header="Username"></Column>
                        <Column field="attributes.guac-organization" header="Organization"></Column>
                        <Column field="attributes.guac-full-name" header="Full name"></Column>
                        <Column field="lastActive" body={dateTemplate} header="Last Active"></Column>
                    </DataTable>
                </div>
            </div>
            <div className="p-col-12 "><Button label="New User" onClick={saveUser}></Button></div>
        </div>
    )
}
