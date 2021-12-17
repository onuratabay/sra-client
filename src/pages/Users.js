import React from 'react';
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {ActiveSession} from "./ActiveSession";
import {Accordion, AccordionTab} from "primereact/accordion";
import {InputText} from "primereact/inputtext";

function setChecked(checked) {

}

export const Users = () => {

    return (
        <div>
            <div className="p-grid">
                <Accordion multiple className="p-col-12 p-accordion">
                    <AccordionTab header="EDIT USER" className="p-accordion-header">
                        <div className="p-grid">
                            <div className="p-col-6">Username:</div>
                            <div className="p-col-6"><InputText/><span className="p-ml-2"></span></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Password:</div>
                            <div className="p-col-6"><InputText/><span className="p-ml-2"></span></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Re-enter Password:</div>
                            <div className="p-col-6"><InputText/><span className="p-ml-2"></span></div>
                        </div>
                    </AccordionTab>
                    <AccordionTab className="p-accordion-header" header="PROFILE">
                        <div className="p-grid">
                            <div className="p-col-6">Full Name:</div>
                            <div className="p-col-6"><InputText/><span className="p-ml-2"></span></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Email Adress:</div>
                            <div className="p-col-6"><InputText/><span className="p-ml-2"></span></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Organization:</div>
                            <div className="p-col-6"><InputText/><span className="p-ml-2"></span></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Role:</div>
                            <div className="p-col-6"><InputText/><span className="p-ml-2"></span></div>
                        </div>
                    </AccordionTab >
                    <AccordionTab className="p-accordion-header" header="ACCOUNT RESTRICTIONS">
                        <div className="p-grid">
                            <div className="p-col-6">Login Disabled:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                <Checkbox inputId="binary" onChange={e => setChecked(e.checked)} />
                                <label htmlFor="binary" ></label>
                            </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Password Expired:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="binary" onChange={e => setChecked(e.checked)} />
                                    <label htmlFor="binary" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Allow Access After:</div>
                            <div className="p-col-6"></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Do Not Allow Access After:</div>
                            <div className="p-col-6"></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Enable Account After:</div>
                            <div className="p-col-6"></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Disable Account After:</div>
                            <div className="p-col-6"></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">User Time Zone :</div>
                            <div className="p-col-6"></div>
                        </div>
                    </AccordionTab>
                    <AccordionTab className="p-accordion-header" header="PERMISSIONS">
                        <div className="p-grid">
                            <div className="p-col-6">Administer System:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="binary" onChange={e => setChecked(e.checked)} />
                                    <label htmlFor="binary" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create New Users:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="binary" onChange={e => setChecked(e.checked)} />
                                    <label htmlFor="binary" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create New User Groups:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="binary" onChange={e => setChecked(e.checked)} />
                                    <label htmlFor="binary" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create New Connections:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="binary" onChange={e => setChecked(e.checked)} />
                                    <label htmlFor="binary" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create New Connection Groups:</div>
                            <div className="p-col-6">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="binary" onChange={e => setChecked(e.checked)} />
                                    <label htmlFor="binary" ></label>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create New Sharing Profiles:</div>
                            <div className="p-col-6">
                            <div className="p-field-checkbox">
                            <Checkbox inputId="binary" onChange={e => setChecked(e.checked)} />
                            <label htmlFor="binary" ></label>
                            </div></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create Own Password:</div>
                            <div className="p-col-6"><div className="p-field-checkbox">
                                <Checkbox inputId="binary" onChange={e => setChecked(e.checked)} />
                                <label htmlFor="binary" ></label>
                            </div></div>
                        </div>
                    </AccordionTab>
                    <AccordionTab className="p-accordion-header" header="GROUPS" >
                        <div></div>
                    </AccordionTab>
                    <AccordionTab className="p-accordion-header" header="CONNECTIONS" >
                        <ActiveSession/>
                    </AccordionTab>
                </Accordion>

            </div>
            <div className="p-grid card">
                <Button label="Save" className="p-m-1"/>
                <Button label="Cancel" className="p-m-1"/>
            </div>
        </div>

    );

}
