import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useHistory,Redirect } from 'react-router-dom';
import logo from "../assets/logo.png";
import {Checkbox} from "primereact/checkbox";
import axios from "axios";
import {createStore} from "react-hookstore";

import {Toast} from "primereact/toast";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);



    useEffect(() => {
        return function cleanup() {
            // setRedirect(false);
            setUsername('');
            setPassword('');
        }
    },[]);

	const history = useHistory();

	function toLogin(){
        axios({
            method: 'post',
            url: 'http://35.156.183.138:8080/guacamole/api/tokens',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' +
                    Buffer.from(`${username}:${password}`, 'binary').toString('base64'),
            }
        }).then(function (response) {
            if(response.status===200){
                localStorage.setItem('token',response.data.authToken)
                localStorage.setItem('dataSource',response.data.dataSource)
                localStorage.setItem('username',response.data.username)
                setRedirect(true);
            }
        }).catch((error) => {
            console.log(error,'ERRR');
        })
    }

	const goDashboard = () => {
		history.push('/');
	}

    if (redirect )
        return <Redirect push to="/"/>

	return (
		<div className="pages-body login-page p-d-flex p-flex-column">
			<div className="p-as-center p-mt-auto p-mb-auto">
				<div className="pages-panel card p-d-flex p-flex-column">

					<div className="pages-detail p-mb-6 p-px-6"> <img src={logo} style={{height:"5rem"}}/> </div>

					<div className="input-panel p-d-flex p-flex-column p-px-3">
						<div className="p-inputgroup">
							<span className="p-inputgroup-addon">
								<i className="pi pi-envelope"></i>
							</span>
							<span className="p-inputgroup">
                                <InputText type="text" id="inputgroup1"  placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
							</span>
						</div>

						<div className="p-inputgroup p-mt-3 p-mb-6">
							<span className="p-inputgroup-addon">
								<i className="pi pi-lock"></i>
							</span>
							<span className="p-inputgroup">
								<InputText type="password" id="inputgroup2" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
							</span>
						</div>

					</div>
                    <div className="p-grid">
                        <div className="p-field-checkbox p-col-6 p-m-auto">
                            <Checkbox inputId="binary"/>
                            <label htmlFor="binary">Remember me</label>
                        </div>
                        <Button className="login-button p-mb-6 p-px-3 p-col-6 p-m-auto" label="Sign In" onClick={()=>toLogin()}></Button>

                    </div>


				</div>
			</div>
		</div>
	)
}

export default Login;
