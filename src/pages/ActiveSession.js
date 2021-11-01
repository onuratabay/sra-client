import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../service/NodeService';
import axios from "axios";
import {DataTable} from "primereact/datatable";

export const ActiveSession = () => {

    const [activeSessions, setActiveSessions] = useState([]);
    const [selectedSessions, setSelectedSessions] = useState(null);



    useEffect(() => {

        axios({
            method: 'get',
            url: 'http://35.156.183.138:8080/guacamole/api/session/data/mysql/activeConnections?token=EAAB30CDB7A2A890A2C8955C686E5B23254224E96EC04327805AFE3D00ED3AE0',
            params : {
                'token': localStorage.getItem('token')
            }
        }).then(function (response) {
            console.log(response,'SESS');
            if(response.status===200 && response.data){
                setActiveSessions(response.data);
            }

        }).catch((error) => {
            console.log(error,'ERRR');
        })

    },[]);


    function onSelectionChange(e){
        setSelectedSessions(e.value)
    }








    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>Session</h5>
                    <DataTable value={activeSessions} selection={selectedSessions} onSelectionChange={e => onSelectionChange(e)} dataKey="id" responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
                        <Column field="username" header="Username"></Column>
                        <Column field="startDate" header="Active since"></Column>
                        <Column field="remoteHost" header="Remote Host"></Column>
                        <Column field="connectionIdentifier" header="Connection name"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}
