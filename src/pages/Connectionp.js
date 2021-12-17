import React, {useState} from 'react';
import {Accordion, AccordionTab} from "primereact/accordion";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {Checkbox} from "primereact/checkbox";


const protocol = [
    {name: 'Kubernetes'},
    {name: 'RDP'},
    {name: 'SSH'},
    {name: 'Telnet'},
    {name: 'VNC'}
];
const encryption = [
    {name: 'None (unensrypted)'},
    {name: 'SSL / TLS'}
];
export const Connectionp = () => {
    const [prtl, setPrtl] = useState();
    const [val1, setVal1] = useState();
    const [val2, setVal2] = useState();
    const [val3, setVal3] = useState();
    const [val4, setVal4] = useState();
    const [enc, setEnc] = useState();
    // const [onur, setOnur] = useState(VNC);

    return (
        <div className="p-grid">
            <Accordion multiple className="p-col-12 p-accordion">
                <AccordionTab header="EDIT CONNECTION" className="p-accordion-header">
                    <div className="p-grid">
                        <div className="p-col-6">Name:</div>
                        <div className="p-col-6"><InputText/><span className="p-ml-2"></span></div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-6">Location:</div>
                        <div className="p-col-6"><InputText/><span className="p-ml-2">Tree eklenecek</span></div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-6">Protocol:</div>
                        <div className="p-col-6"><Dropdown optionLabel="name" value={prtl} options={protocol} onChange={(e) => setPrtl(e.value)} placeholder="Select a Protocol"/></div>
                    </div>
                </AccordionTab>
                <AccordionTab header="CONCURRENCY LIMITS" className="p-accordion-header">
                    <div className="p-grid">
                        <div className="p-col-6">Maximum number of connections:</div>
                        <div className="p-col-6"><InputNumber value={val1} onValueChange={(e) => setVal1(e.value)} showButtons /></div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-6">Maximum number of connections per user:</div>
                        <div className="p-col-6"><InputNumber value={val2} onValueChange={(e) => setVal2(e.value)} showButtons /></div>
                    </div>
                </AccordionTab>
                <AccordionTab header="LOAD BALANCING" className="p-accordion-header">
                    <div className="p-grid">
                        <div className="p-col-6">Maximum number of connections per user:	</div>
                        <div className="p-col-6"><InputNumber value={val3} onValueChange={(e) => setVal3(e.value)} showButtons /></div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-6">Use for failover only:</div>
                        <div className="p-col-6"><Checkbox /></div>
                    </div>
                </AccordionTab>
                <AccordionTab header="GUACAMOLE PROXY PARAMETERS (GUACD)" className="p-accordion-header">
                    <div className="p-grid">
                        <div className="p-col-6">Hostname:	</div>
                        <div className="p-col-6"></div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-6">Port:</div>
                        <div className="p-col-6"><InputNumber value={val4} onValueChange={(e) => setVal4(e.value)} showButtons /></div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-6">Encryption:</div>
                        <div className="p-col-6"><Dropdown optionLabel="name" value={enc} options={encryption} onChange={(e) => setEnc(e.value)} placeholder="Select a Protocol"/></div>
                    </div>
                </AccordionTab>
                <AccordionTab header="PARAMETERS" className="p-accordion-header">
                { protocol.name === "Kubernetes" && <div>Kubernetes</div>}
                { protocol.name === "RDP" && <div>RDP</div> }
                { protocol.name === "SSH" && <div>SSH</div> }
                { protocol.name === "Telnet" && <div>Telnet</div>}
                { protocol.name === "VNC" && <div>VNC</div> }
                    </AccordionTab>
            </Accordion>
        </div>
    );

}
