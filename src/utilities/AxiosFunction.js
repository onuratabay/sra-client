import axios from 'axios';
import React from 'react';
import {Slide, toast} from "react-toastify";
import {useStore} from "react-hookstore";
/**
 * @description istek atma fonksiyounu
 * @param opts Object
 * @param opts.callbackSuccess
 * @param opts.callbackError
 * @param opts.method
 * @param opts.url
 * @param opts.params
 * @param opts.headers
 * @param opts.data
 * @param opts.showInfo info mesajlarının ekrana basılmasını sağlar
 * @param opts.showWarn warn mesajlarının ekrana basılmasını sağlar
 *
 * */
export default function AxiosFunction(opts) {
    //  loader.handleChange();
    // console.log("0");
    const lhelper = new logHelper();

    if(opts && opts.hasOwnProperty("progress") && opts.progress === true)
        lhelper.increaseRequestCount();
    let requestStatus=true;
    const options = {
        timeout: 100000,
        ...opts,
    };
    const messageTypes = {
        INFO: "INFO",
        ERROR: "ERROR",
        WARNING: "WARNING",
    };


    if (options.headers && localStorage.getItem('access_token')) {

        //  loader.handleChange2();
        let acccessToken;
        if(options.accessToken) {
            acccessToken = options.accessToken;
        }
        else
            acccessToken = localStorage.getItem('access_token');

        options.headers['Authorization'] = 'Bearer ' + acccessToken;
        if(options.customHeader && options.customHeader !==false) {
            options.headers["Location"] = lhelper.getUserLocation();
            options.headers['clientName'] = 'EAFADCLIENT';
            options.headers['clientType'] = lhelper.getBrowserName();
            options.headers['clientDetail'] = lhelper.getClientDetail();
        }

    }

    const slowRequestMessageStop=()=>{
        requestStatus=false;
        toast.dismiss("slowMessageToast");
    };
    const slowRequestMessageShow=(opt)=>{
        if(opt.slowRequest)
            setTimeout(() => {
                if(requestStatus)
                    toast.info(opt.slowRequest.message, {autoClose: false, position: toast.POSITION.TOP_RIGHT, toastId:"slowMessageToast"});
            },opt.slowRequest.second*1000);
    }
    slowRequestMessageShow(opts);
    let showMessages = (data,url) => {
        if (messageTypes.INFO === data.messageCode) {
            if (opts.showInfo) {

                toast.info(data.messageList.join("\n"), {autoClose: 5000, position: toast.POSITION.TOP_CENTER, transition:Slide });
            }
        }
        if (messageTypes.WARNING === data.messageCode) {
            if(opts.showWarn === undefined || opts.showWarn === true) {
                toast.warn(data.messageList.join("\n"), {autoClose: 5000, position: toast.POSITION.TOP_CENTER, transition:Slide });
            }else {
                return data.messageList;
            }
        }
        if (messageTypes.ERROR === data.messageCode) {
            console.error(" ::::::::::::::::::::::::::: SERVER RESPONSE ERROR ::::::::::::::::::::::::::::: \n "
                + " STATUS  : " + data.status + " \n"
                + " URL : " + url + "\n"
                + " MESSAGE :" + data.messageList.join("\n"));

            if(data.status == 'UNAUTHORIZED' && !data.messageList.join("\n").includes('null')){
                window.location = "./";
            }
        }
    };

    if(document.getElementById("progressDiv") && document.getElementById("progressDiv") != null){
        document.getElementById("progressDiv").style.display = "block";
        if(document.getElementById("kullaniciKonumAktif") && document.getElementById("kullaniciKonumAktif") != null){
            document.getElementById("kullaniciKonumAktif").style.display = "none";
        }
        if(document.getElementById("kullaniciKonumPasif") && document.getElementById("kullaniciKonumPasif") != null){
            document.getElementById("kullaniciKonumPasif").style.display = "block";
        }
    }

    axios(options).then((resp) => {

        if(opts && opts.hasOwnProperty("progress") && opts.progress === true)
            lhelper.decreaseRequestCount();

        if(document.getElementById("progressDiv") && document.getElementById("progressDiv") != null){
            if(lhelper.getRequestCount()<1) {
                lhelper.resetCount();
                document.getElementById("progressDiv").style.display = "none";

                slowRequestMessageStop()

            }
        }

        //  console.log("2");
        if (resp.status === 200) {
            if (resp.data.messageList) {
                showMessages(resp.data);
                console.log('RESPONSE Success! ->', resp.data);
                if (opts.callbackSuccess) {
                    if(opts.showWarn === false)
                        opts.callbackSuccess(resp.data);
                    else
                        opts.callbackSuccess(resp.data.data);

                }

            } else {
                console.error(" SERVER RESPONSE TYPE ERROR : url e atılan isteklerin response yapısı uygun değil -> " + resp.config.url + " <- ");
                if (opts.callbackSuccess) {
                    opts.callbackSuccess(resp.data);
                }
            }
        }
    }).catch((error) => {

        if(opts && opts.hasOwnProperty("progress") && opts.progress === true)
            lhelper.decreaseRequestCount();

        if(document.getElementById("progressDiv") && document.getElementById("progressDiv") != null){
            if(lhelper.getRequestCount()<1) {
                lhelper.resetCount();
                slowRequestMessageStop();
                document.getElementById("progressDiv").style.display = "none";
            }
        }

        if (error.response && error.response.data.messageList) {
            showMessages(error.response.data, error.response.config.url);
        } else if(error.response ){
            console.error(" SERVER RESPONSE TYPE ERROR : url e atılan isteklerin response yapısı uygun değil -> " + error.response.config.url + " <- ");

        }else {
            console.error(error)
        }
        if (opts.callbackError) {
            opts.callbackError(error);
        }
    });
}
