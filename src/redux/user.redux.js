import axios from 'axios';
import {getRedirectPath} from "../util.js";

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';
const ERROR_SMG = 'ERROR_SMG';

const initState = {
    username: '',
    redirectTo: '',
    msg: '',
    sex: ''
}
export function user(state=initState, action) {
    switch (action.type){
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload};
        case ERROR_SMG:
            return {...state, msg:action.msg};
        case LOAD_DATA:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
            default:
            return state;
    }
}

function authSuccess(dataObj){
    //filter password,
    const {password,...data} = dataObj
    return {type:AUTH_SUCCESS, payload:data};
}

function errorMsg(msg){
    return {type:ERROR_SMG,msg:msg};
}
//login
export function login({username,password}) {
    //console.log({username,password})
    if (!username || !password){
        return errorMsg('Please input username and password');
    }
    return (dispatch)=>{
        axios.post('/user/login',{username, password})
            .then(res=>{
                if (res.status==200 && res.data.code===0){
                    console.log('user.redux.js.login->',res.data);
                    dispatch(authSuccess(res.data.data));
                }else{
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}
//register
export function register({username,password,repassword,sex}) {
    if (!username || !password || !repassword || !sex){
        return errorMsg('Please enter in username,password,sex');
    }
    if (password !== repassword){
        return errorMsg('The password and the confirmation do not match ')
    }
    return (dispatch)=>{
        axios.post('/user/register',{username,password,sex})
            .then(res=>{
                if (res.status===200&&res.data.code===0){
                    dispatch(authSuccess({username,password,sex}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
//update
export function update(data) {
    //console.log('user.redux.js-update',data);//age country desc
    return (dispatch)=>{
        axios.post('/user/update',data)
            .then(res=>{
                if (res.status==200 && res.data.code ===0){
                    dispatch(authSuccess(res.data.data));
                }else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}
export function loadData(userinfo) {
    return {type:LOAD_DATA,payload:userinfo}
}

export function logoutSubmit() {
    return {type:LOGOUT}
}



























































































