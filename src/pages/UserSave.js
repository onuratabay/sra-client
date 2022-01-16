import React, {useEffect, useState} from "react";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {ActiveSession} from "./ActiveSession";
import {Accordion, AccordionTab} from "primereact/accordion";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {addLocale} from "primereact/api";
import {MyConnection} from "./MyConnection";
import {Dropdown} from "primereact/dropdown";
import {Redirect} from "react-router-dom";



export default function UserSave() {
    const [redirect, setRedirect] = useState(false);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);

    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [role, setRole] = useState(null);


    const [loginDisabled, setLoginDisabled] = useState(false);
    const [passwordExpired, setPasswordExpired] = useState(false);
    const [allowAccessAfter, setAllowAccessAfter] = useState(null);
    const [dontAllowAccessAfter, setDontAllowAccessAfter] = useState(null);
    const [enableAccount, setEnableAccount] = useState(null);
    const [disableAccount, setDisableAccount] = useState(null);
    const [selectedTimeZone, setSelectedTimeZone] = useState(null);

    const [administerSystem, setAdministerSystem] = useState(false);
    const [createNewUser, setCreateNewUser] = useState(false);
    const [createNewUserGroup, setCreateNewUserGroup] = useState(false);
    const [createNewConnection, setCreateNewConnection] = useState(false);
    const [createNewConnectionGroup, setCreateNewConnectionGroup] = useState(false);
    const [createNewSharingProfile, setCreateNewSharingProfile] = useState(false);
    const [createOwnPassword, setCreateOwnPassword] = useState(false);

    const timeZones = [
        { name: 'Africa', code: 'Africa' },
        { name: 'America', code: 'America' },
        { name: 'Antarctica', code: 'Antarctica' },
        { name: 'Arctic', code: 'Arctic' },
        { name: 'Asia', code: 'Asia' },
        { name: 'Atlantic', code: 'Atlantic' },
        { name: 'Australia', code: 'Australia' },
        { name: 'Brazil', code: 'Brazil' },
        { name: 'Canada', code: 'Canada' },
        { name: 'Chile', code: 'Chile' },
        { name: 'Europe', code: 'Europe' },
        { name: 'GMT', code: 'GMT' },
        { name: 'Indian', code: 'Indian' },
        { name: 'Mexico', code: 'Mexico' },
        { name: 'Pacific', code: 'Pacific' },
    ];

    addLocale('tr', {
        firstDayOfWeek: 1,
        dayNames: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
        dayNamesShort: ["Pzr", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"],
        dayNamesMin: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
        monthNames: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        monthNamesShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Ekim", "Kas", "Ara"],
        today: 'Bugün',
        clear: 'Temizle',
    });

    function cancel(){
        setRedirect(true);
    }

    function save(){

    }

    if (redirect)
        return <Redirect push to="/Users"/>

    return (
        <div>
            <div className="p-grid">
                <Accordion multiple className="p-col-12 p-accordion" activeIndex={[0]}>
                    <AccordionTab header="EDIT USER" className="p-accordion-header">
                        <div className="p-grid">
                            <div className="p-col-6">Username:</div>
                            <div className="p-col-6"><InputText  value={username} onChange={(e) => setUsername(e.target.value)} /><span className="p-ml-2"></span></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Password:</div>
                            <div className="p-col-6"><InputText value={password} onChange={(e) => setPassword(e.target.value)}/><span className="p-ml-2"></span></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Re-enter Password:</div>
                            <div className="p-col-6"><InputText value={rePassword} onChange={(e) => setRePassword(e.target.value)}/><span className="p-ml-2"></span></div>
                        </div>
                    </AccordionTab>
                    <AccordionTab className="p-accordion-header" header="PROFILE">
                        <div className="p-grid">
                            <div className="p-col-6">Full Name:</div>
                            <div className="p-col-6"><InputText value={fullName} onChange={(e) => setFullName(e.target.value)}/><span className="p-ml-2"></span></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Email Adress:</div>
                            <div className="p-col-6"><InputText value={email} onChange={(e) => setEmail(e.target.value)}/><span className="p-ml-2"></span></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Organization:</div>
                            <div className="p-col-6"><InputText value={organization} onChange={(e) => setOrganization(e.target.value)}/><span className="p-ml-2"></span></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Role:</div>
                            <div className="p-col-6"><InputText value={role} onChange={(e) => setRole(e.target.value)}/><span className="p-ml-2"></span></div>
                        </div>
                    </AccordionTab >
                    <AccordionTab className="p-accordion-header" header="ACCOUNT RESTRICTIONS">
                        <div className="p-grid">
                            <div className="p-col-6">Login Disabled:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="loginDisable" onChange={(e => setLoginDisabled(e.checked))}
                                              checked={loginDisabled}/>
                                    <label htmlFor="loginDisable" ></label>
                            </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Password Expired:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="passwordExpired" onChange={(e => setPasswordExpired(e.checked))}
                                              checked={passwordExpired}/>
                                    <label htmlFor="passwordExpired" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Allow Access After:</div>
                            <div className="p-col-6">
                                <Calendar id="time24" value={allowAccessAfter} onChange={(e) => setAllowAccessAfter(e.value)} showTime timeOnly/>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Do Not Allow Access After:</div>
                            <div className="p-col-6">
                                <Calendar id="time24" value={dontAllowAccessAfter} onChange={(e) => setDontAllowAccessAfter(e.value)} showTime timeOnly/>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Enable Account After:</div>
                            <div className="p-col-6">
                                <Calendar id="" value={enableAccount} onChange={(e) => setEnableAccount(e.value)} dateFormat="dd/mm/yy" />
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Disable Account After:</div>
                            <div className="p-col-6">
                                <Calendar id="" value={disableAccount} onChange={(e) => setDisableAccount(e.value)} dateFormat="dd/mm/yy" />
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">User Time Zone :</div>
                            <div className="p-col-6">
                                <Dropdown value={selectedTimeZone} options={timeZones} onChange={(e)=>setSelectedTimeZone(e.value)} optionLabel="name" placeholder="Time Zone" />
                            </div>
                        </div>
                    </AccordionTab>
                    <AccordionTab className="p-accordion-header" header="PERMISSIONS">
                        <div className="p-grid">
                            <div className="p-col-6">Administer System:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="administerSystem" onChange={(e => setAdministerSystem(e.checked))}
                                              checked={administerSystem}/>
                                    <label htmlFor="administerSystem" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create New Users:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="createNewUser" onChange={(e => setCreateNewUser(e.checked))}
                                              checked={createNewUser}/>
                                    <label htmlFor="createNewUser" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create New User Groups:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="createNewUserGroup" onChange={(e => setCreateNewUserGroup(e.checked))}
                                              checked={createNewUserGroup}/>
                                    <label htmlFor="createNewUserGroup" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create New Connections:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="createNewConnection" onChange={(e => setCreateNewConnection(e.checked))}
                                              checked={createNewConnection}/>
                                    <label htmlFor="createNewConnection" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create New Connection Groups:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="createNewConnectionGroup" onChange={(e => setCreateNewConnectionGroup(e.checked))}
                                              checked={createNewConnectionGroup}/>
                                    <label htmlFor="createNewConnectionGroup" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create New Sharing Profiles:</div>
                            <div className="p-col-6">
                            <div className="p-field-checkbox">
                                <Checkbox inputId="createNewSharingProfile" onChange={(e => setCreateNewSharingProfile(e.checked))}
                                          checked={createNewSharingProfile}/>
                            <label htmlFor="createNewSharingProfile" ></label>
                            </div></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create Own Password:</div>
                            <div className="p-col-6"><div className="p-field-checkbox">
                                <Checkbox inputId="createOwnPassword" onChange={(e => setCreateOwnPassword(e.checked))}
                                          checked={createOwnPassword}/>
                                <label htmlFor="createOwnPassword" ></label>
                            </div></div>
                        </div>
                    </AccordionTab>
                    <AccordionTab className="p-accordion-header" header="GROUPS" >
                        <div></div>
                    </AccordionTab>
                    <AccordionTab className="p-accordion-header" header="CONNECTIONS" >
                        <MyConnection isChecked={true}></MyConnection>
                    </AccordionTab>
                </Accordion>

            </div>
            <div className="p-grid card">
                <Button label="Save" className="p-m-1" onClick={save}/>
                <Button label="Cancel" className="p-m-1" onClick={cancel}/>
            </div>
        </div>

    );

}
