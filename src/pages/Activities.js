import React, {useEffect, useState} from 'react';
import {Column} from 'primereact/column';
import axios from "axios";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {useStore} from "react-hookstore";

export const Activities = () => {
    const [connectionTree, setConnectionTree] = useStore("connectionTree");

    const [historyData, setHistoryData] = useState([]);
    // const [selectedSessions, setSelectedSessions] = useState([]);



    useEffect(() => {
        getHistory();
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
                setHistoryData(response.data);
            }

        }).catch((error) => {
            console.log(error,'ERRR');
        })
    }

    const dateTemplate = (rowData) => {
        return rowData?((new Date(rowData.startDate)).toISOString().slice(0, 10) + ' ' + (new Date(rowData.startDate)).toLocaleTimeString()):null;
    }

    const durationTemplate = (rowData) => {
        return rowData?((new Date(rowData.startDate)).toISOString().slice(0, 10) + ' ' + (new Date(rowData.startDate)).toLocaleTimeString()):null;
    }

    const connectionNameTemplate = (rowData) => {
        return rowData?((new Date(rowData.startDate)).toISOString().slice(0, 10) + ' ' + (new Date(rowData.startDate)).toLocaleTimeString()):null;
    }




    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>Active Connections</h5>
                    <DataTable value={historyData}  dataKey="index" responsiveLayout="scroll">
                        <Column field="username" header="Username"></Column>
                        <Column body={dateTemplate} header="Active since"></Column>
                        <Column body={durationTemplate} header="Duration"></Column>
                        <Column body={connectionNameTemplate} header="Connection name"></Column>
                        <Column field="remoteHost" header="Remote Host"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}
