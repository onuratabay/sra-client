import React from 'react';
import {Accordion, AccordionTab} from "primereact/accordion";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Session} from "./Session";

export const Groups = () => {

    return (
        <div className="p-grid">
                <Accordion multiple className="p-col-12 p-accordion">
                    <AccordionTab header="EDIT GROUP" className="p-accordion-header">
                        <div className="p-grid">
                            <div className="p-col-6">Group Name:</div>
                            <div className="p-col-6"><InputText/><span className="p-ml-2"></span></div>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="GROUP RESTRICTIONS">
                        <div className="p-grid">
                            <div className="p-col-6">Disabled:</div>
                            <div className="p-col-6">
                                <Checkbox />
                            </div>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="PERMISSIONS">
                        <div className="p-grid">
                            <div className="p-col-6">Administer system:	</div>
                            <div className="p-col-6">
                                <Checkbox />
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create new users:	</div>
                            <div className="p-col-6">
                                <Checkbox />
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create new user groups:	</div>
                            <div className="p-col-6">
                                <Checkbox />
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create new connections:	</div>
                            <div className="p-col-6">
                                <Checkbox />
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create new connection groups:	</div>
                            <div className="p-col-6">
                                <Checkbox />
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">Create new sharing profiles:	</div>
                            <div className="p-col-6">
                                <Checkbox />
                            </div>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="PARENT GROUPS">
                        <div className="p-grid">
                            <div  className="p-col-12"><Checkbox/> Ankara Admin</div>
                        </div>
                        <div className="p-grid">
                            <div  className="p-col-12"><Checkbox/> Test Group</div>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="MEMBER GROUPS">
                        <div className="p-grid">
                            <div  className="p-col-12"><Checkbox/> Ankara Admin</div>
                        </div>
                        <div className="p-grid">
                            <div  className="p-col-12"><Checkbox/> Test Group</div>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="MEMBER USERS">
                        <div className="p-grid">
                            <div  className="p-col-12"><Checkbox/> guacadmin</div>
                        </div>
                        <div className="p-grid">
                            <div  className="p-col-12"><Checkbox/> sdads</div>
                        </div>
                        <div className="p-grid">
                            <div  className="p-col-12"><Checkbox/> sradmin</div>
                        </div>
                        <div className="p-grid">
                            <div  className="p-col-12"><Checkbox/> User1</div>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="CONNECTIONS">
                        <Session />
                    </AccordionTab>
                </Accordion>
        </div>
    );

}
