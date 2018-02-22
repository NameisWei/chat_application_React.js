import React from 'react';
import { List, Radio,  WhiteSpace,InputItem,Button } from 'antd-mobile';
import Logo from '../../component/logo/logo.js'
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux.js';
import {Redirect} from 'react-router-dom';


@connect(
    state=>state.user,
    {register}
)
class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            username:'',
            password:'',
            repassword:'',
            sex:'female'
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.register(this.state);
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <List>
                    {this.props.msg?<p className='error-msg'></p>:null}
                    <InputItem placeholder='Username'  onChange={(v)=>{this.handleChange('username',v)}}></InputItem>
                    <InputItem placeholder='Password' type='password' onChange={(v)=>{this.handleChange('password',v)}}></InputItem>
                    <InputItem placeholder='Confirm Password'type='password' onChange={(v)=>{this.handleChange('repassword',v)}}></InputItem>
                    <RadioItem checked={this.state.sex =='male'} onChange={()=>{this.handleChange('sex','male')}}>Male</RadioItem>
                    <RadioItem checked={this.state.sex =='female'} onChange={()=>{this.handleChange('sex','female')}}>Female</RadioItem>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister.bind(this)}>CREATE ACCOUNT</Button>
                </List>
            </div>
        )
    }
}
export default Register;