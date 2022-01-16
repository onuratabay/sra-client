import React, {useState} from 'react';
import {Accordion, AccordionTab} from "primereact/accordion";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {MyConnection} from "./MyConnection";
import {Button} from "primereact/button";

export const Groups = () => {
    const [groupsPageId, setGroupsPageId] = useState(1);
    const [disabled, setDisabled] = useState(false);
    const [adminSystem, setAdminSystem] = useState(false);
    const [createNewUserGroups, setCreateNewUserGroups] = useState(false);
    const [createNewUsers, setCreateNewUsers] = useState(false);
    const [createNewConnections, setCreateNewConnections] = useState(false);
    const [createNewConnectionGroups, setCreateNewConnectionGroups] = useState(false);
    const [createNewSharingProfiles, setCreateNewSharingProfiles] = useState(false);
    const [ankaraAdmin, setAnkaraAdmin] = useState(false);
    const [testGroup, setTestGroup] = useState(false);
    const [ankaraMAdmin, setAnkaraMAdmin] = useState(false);
    const [testMGroup, setTestMGroup] = useState(false);
    const [guacadmin, setGuacadmin] = useState(false);
    const [sradmin, setSradmin] = useState(false);
    const [sdads, setSdads] = useState(false);
    const [user1, setUser1] = useState(false);
    return (
        <div className="p-grid">
            <Button label="Groups List" icon="pi pi-check"/>
            <Button label="Groups Edit" icon="pi pi-check"/>
            {groupsPageId === 1 && <Accordion multiple className="p-col-12 p-accordion">
                <AccordionTab header="EDIT GROUP" className="p-accordion-header">
                    <div className="p-grid">
                        <div className="p-col-3">Group Name:</div>
                        <div className="p-col-3"><InputText/><span className="p-ml-2"></span></div>
                    </div>
                </AccordionTab>
                <AccordionTab header="GROUP RESTRICTIONS">
                    <div className="p-grid ">
                        <div className="p-col-3">Disabled:</div>
                        <div className="p-col-3">
                            <Checkbox checked={disabled} onChange={e => setDisabled(e.checked)}/>
                        </div>
                    </div>
                </AccordionTab>
                <AccordionTab header="PERMISSIONS">
                    <div className="p-grid">
                        <div className="p-grid p-col-6">
                            <div className="p-col-6">Administer system:</div>
                            <div className="p-col-6">
                                <Checkbox checked={adminSystem} onChange={e => setAdminSystem(e.checked)}/>
                            </div>
                        </div>
                        <div className="p-grid p-col-6">
                            <div className="p-col-6">Create new users:</div>
                            <div className="p-col-6">
                                <Checkbox checked={createNewUsers} onChange={e => setCreateNewUsers(e.checked)}/>
                            </div>
                        </div>
                    </div>
                    <div className="p-grid">
                        <div className="p-grid p-col-6">
                            <div className="p-col-6">Create new user groups:</div>
                            <div className="p-col-6">
                                <Checkbox checked={createNewUserGroups} onChange={e => setCreateNewUserGroups(e.checked)}/>
                            </div>
                        </div>
                        <div className="p-grid p-col-6">
                            <div className="p-col-6">Create new connections:</div>
                            <div className="p-col-6">
                                <Checkbox checked={createNewConnections} onChange={e => setCreateNewConnections(e.checked)}/>
                            </div>
                        </div>
                    </div>
                    <div className="p-grid">
                        <div className="p-grid p-col-6">
                            <div className="p-col-6">Create new connection groups:</div>
                            <div className="p-col-6">
                                <Checkbox checked={createNewConnectionGroups} onChange={e => setCreateNewConnectionGroups(e.checked)}/>
                            </div>
                        </div>
                        <div className="p-grid p-col-6">
                            <div className="p-col-6">Create new sharing profiles:</div>
                            <div className="p-col-6">
                                <Checkbox checked={createNewSharingProfiles} onChange={e => setCreateNewSharingProfiles(e.checked)}/>
                            </div>
                        </div>
                    </div>
                </AccordionTab>
                <AccordionTab header="PARENT GROUPS">
                    <div className="p-grid">
                        <div className="p-grid p-col-6">
                            <div className="p-col-12"><Checkbox checked={ankaraAdmin} onChange={e => setAnkaraAdmin(e.checked)}/> Ankara Admin</div>
                        </div>
                        <div className="p-grid p-col-6">
                            <div className="p-col-12"><Checkbox checked={testGroup} onChange={e => setTestGroup(e.checked)}/> Test Group</div>
                        </div>
                    </div>
                </AccordionTab>
                <AccordionTab header="MEMBER GROUPS">
                    <div className="p-grid">
                        <div className="p-grid p-col-6">
                            <div className="p-col-12"><Checkbox checked={ankaraMAdmin} onChange={e => setAnkaraMAdmin(e.checked)}/> Ankara Admin</div>
                        </div>
                        <div className="p-grid p-col-6">
                            <div className="p-col-12"><Checkbox checked={testMGroup} onChange={e => setTestMGroup(e.checked)}/> Test Group</div>
                        </div>
                    </div>
                </AccordionTab>
                <AccordionTab header="MEMBER USERS">
                    <div className="p-grid">
                        <div className="p-grid p-col-6">
                            <div className="p-col-3"><Checkbox checked={guacadmin} onChange={e => setGuacadmin(e.checked)}/> guacadmin</div>
                        </div>
                        <div className="p-grid p-col-6">
                            <div className="p-col-3"><Checkbox checked={sdads} onChange={e => setSdads(e.checked)}/> sdads</div>
                        </div>
                        <div className="p-grid p-col-6">
                            <div className="p-col-3"><Checkbox checked={sradmin} onChange={e => setSradmin(e.checked)}/> sradmin</div>
                        </div>
                        <div className="p-grid p-col-6">
                            <div className="p-col-3"><Checkbox checked={user1} onChange={e => setUser1(e.checked)}/> User1</div>
                        </div>
                    </div>
                </AccordionTab>
                <AccordionTab header="CONNECTIONS">
                    <MyConnection />
                </AccordionTab>
            </Accordion>}
            {groupsPageId === 2 && <div className="p-flex-column">
                <div className="" >Ankara Admin</div>
                <div className="" >TestGroup</div>
            </div>}
        </div>
    );

}
