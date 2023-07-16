// axios 
 import axios from 'axios';
 
import { API_NOTIFICATION_MESSAGES , SERVICE_URLS} from '../constants/config';  
import { getAccessToken ,getType} from '../utils/common-utils'; 
const API_URL='http://localhost:8000/';
 const axiosInstance=axios.create({

    baseURL:API_URL,
    timeout:10000,
    headers:{
        "content-type":"application/json"
    }
  
 });

 axiosInstance.interceptors.request.use(
    function(config)
    {
       // console.log(config);
       if(config.TYPE.params)
       {
        config.params=config.TYPE.params;
       }
       else if(config.TYPE.query)
       {
        config.url=config.url+'/'+config.TYPE.query;
        
       }
        return config;
    },
    function(error)
    {
        return Promise.reject(error);
    }
 )

 axiosInstance.interceptors.response.use(
    function(response)
    {
        //stop global loader here
        return processResponse(response);
    },
    function(error)
    {
        //stop global loader here
        return Promise.reject(processError(error));
    }
 )

 // if success -> return {issuccess:true, data:object}
 // if error -> return { isFailure:true , status: string,msg:string , code:int}

 const processResponse=(response)=>{
    if(response?.status === 200)
    {
        return{
            isSuccess:true, data:response.data
        }
    }
    else{
        return{
        isFailure:true,
        status:response?.status,
        msg:response?.msg,
        code:response?.code
        }
    }
 }

 const processError= (error)=>{
    if(error.response)
    {
        // request made and servr responded with a  status that falls out of the range 2.x.x

        console.log('Error in response:',error.toJSON());
        return{
            isError:true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }else if(error.request)
    {
        console.log('Error in requests:',error.toJSON());
        // request made but no response was receieved
        return{
            isError:true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }

    }
    else{

        console.log('Error in network:',error.toJSON());
        //something happened in setting up request that triggers an error
        return{
            isError:true,
            msg: API_NOTIFICATION_MESSAGES.networkFailure,
            code: ""
        }
     }
    }


    // make actual API
    const API = {};

    for (const [key, value] of Object.entries(SERVICE_URLS)) {
        API[key] = (body, showUploadProgress, showDownloadProgress) =>
            axiosInstance({
                method: value.method,
                url: value.url,
                data: value.method==='DELETE'?{}:body,
                responseType: value.responseType,
                    headers:{
                        authorization: getAccessToken()
                    },
                TYPE: getType(value,body),
                onUploadProgress: function(progressEvent) {
                    if (showUploadProgress) {
                        let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        showUploadProgress(percentageCompleted);
                    }
                },
                onDownloadProgress: function(progressEvent) {
                    if (showDownloadProgress) {
                        let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        showDownloadProgress(percentageCompleted);
                    }
                }
            })
    }

    
    export { API };