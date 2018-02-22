import React from 'react';
import {connect} from 'react-redux';
import {Result,WhiteSpace,List,Modal,Button,WingBlank} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import browserCookie from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux.js';
@connect(
    state=>state.user,
    {logoutSubmit}
)
export default class UserCenter extends React.Component{


    logout(){
        const alert = Modal.alert;
        alert('Logout','Are you sure???',[
            {text:'Cancel',onPress:()=>console.log('cancel')},
            {text:'Confirm',onPress:()=>{
                browserCookie.erase('userid');
                this.props.logoutSubmit();
                }}
        ])
    }
    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        //console.log('usercenter.js',this.props.avatar)
        return this.props.username?(
            <div>

                <Result
                    img={<img src={require(`../img/${this.props.avatar}.png`)} alt='' style={{width:50}}/>}
                    title={this.props.username}
                ></Result>
                <List>
                    <Item><Brief>Sex: {this.props.sex}</Brief></Item>
                    <Item><Brief>Age: {this.props.age}</Brief></Item>
                    <Item><Brief>Country: {this.props.country}</Brief></Item>
                    <Item multipleLine><Brief>Status: {this.props.desc}</Brief></Item>
                </List>
                <WhiteSpace/>
                <Button
                    type='primary'
                    onClick={this.logout.bind(this)}
                >Logout</Button>
            </div>

        ):<Redirect to={this.props.redirectTo}/>
    }
}