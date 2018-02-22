import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';

const initState = {
    chatmessage:[],
    userinfo:{}
}
export function userchat(state=initState,action) {
    switch (action.type){
        case MSG_LIST:
            return {...state, userinfo:action.payload.userinfo,chatmessage:action.payload.messages}
        case MSG_RECV:
            return {...state,chatmessage:[...state.chatmessage,action.payload]}
        default:
            return state;
    }
}

function messageList(messages,userinfo){
    return {type:MSG_LIST,payload:{messages,userinfo}}
}

export function getMessageList() {
    return (dispatch)=>{
        axios.get('./user/getmessagelist')
            .then(res=>{
                if (res.status==200 && res.data.code===0){
                    dispatch(messageList(res.data.messages,res.data.userinfo))
                }
            })
    }
}

export function sendMessage({myselfid,anotherid,messagelist}) {
    return (dispatch)=>{
        socket.emit('sendMessage',{myselfid,anotherid,messagelist})
    }
}

function messageReceive(data) {
    return {type:MSG_RECV,payload:data}
}

export function receiveMessage() {
    return (dispatch)=>{
        socket.on('sendToGlobal',function (data) {
            //console.log('receiveData',data);
            dispatch(messageReceive(data))
        })
    }
}

