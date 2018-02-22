import React from 'react';
import {InputItem,List,NavBar,Icon} from 'antd-mobile';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {getMessageList,sendMessage,receiveMessage} from '../../redux/userchat.redux.js'
const socket = io('ws://localhost:9093');



@connect(
    state=>state,
    {getMessageList,sendMessage,receiveMessage}
)
export default class Chat extends React.Component{
    constructor(){
        super();
        this.state = {
            text: '',
            message:[],
        }
    }
    componentDidMount(){
        this.props.getMessageList();
        this.props.receiveMessage();
    }

    handleSubmint(){

        //console.log(this.props.match.params.userid);
        const myselfid = this.props.user._id; //from
        const anotherid = this.props.match.params.userid; //to
        const messagelist = this.state.text;
        //console.log(myselfid)

        this.props.sendMessage({myselfid,anotherid,messagelist})
        this.setState({text:''});
    }

    render(){
        //console.log('chat.js',this.props)
        const Item = List.Item;
        const myselfid = this.props.user._id;
        const anotherid = this.props.match.params.userid;

        console.log(this.props)

        return (
            <div>
                <NavBar
                    icon={<Icon type="left"></Icon>}
                    onLeftClick={()=>{this.props.history.goBack()}}
                >Chatting Room</NavBar>

                <div id='chat-page'>
                    {this.props.userchat.chatmessage.map(v=>{
                        //const avatar = require(`../img/${v.}`)
                        return v.myselfid==myselfid?(
                            <List key={v._id}>
                                <Item className='mymessage'>{v.content}</Item>
                            </List>
                        ):(
                            <List key={v._id}>
                                <Item >{v.content}</Item>
                            </List>
                        )
                    })}
                </div>
                <div className='chat-sendmessage'>
                    <List>
                        <InputItem
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={<span onClick={()=>this.handleSubmint()}>Send</span>}
                        >Message</InputItem>
                    </List>
                </div>
            </div>
        )
    }
}