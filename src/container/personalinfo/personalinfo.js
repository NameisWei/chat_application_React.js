import React from 'react';
import {connect} from 'react-redux';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import Avatar from '../../component/avatar/avatar.js';
import {update} from "../../redux/user.redux";
import {Redirect} from 'react-router-dom';


@connect(
    state=>state.user,
    {update}
)
export default class PersonalInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            age:'',
            country:'',
            desc:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        console.log('personalinfo.js,path:',path) ///maleinfo
        console.log('personalinfo.js,redirect:',redirect)//male
        return (
            <div>
                {redirect&&redirect!==path?<Redirect to={redirect}></Redirect>:null}
                <NavBar>Personal Information</NavBar>
                <Avatar selectAvatar={(imgname)=>{
                    this.setState({
                        avatar:imgname
                    })
                }}></Avatar>
                <InputItem onChange={(v)=>{this.onChange('age',v)}}>Age:</InputItem>
                <InputItem onChange={(v)=>{this.onChange('country',v)}}>Country:</InputItem>
                <TextareaItem title='Status' rows={5} onChange={(v)=>{this.onChange('desc',v)}}></TextareaItem>
                <Button type='primary' onClick={()=>this.props.update(this.state)}>save</Button>
            </div>
        )
    }
}