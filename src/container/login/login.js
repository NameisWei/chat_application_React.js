import React from 'react'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import Logo from '../../component/logo/logo.js';
import {login} from '../../redux/user.redux.js';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';




@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component{

    constructor(){
        super();
        this.state = {
            username:'',
            password:''
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleLogin(){
        //console.log('login.js',this.props)
        this.props.login(this.state)
    }
    register(){
        this.props.history.push('/register')
    }
    render(){
        //console.log('login.js this.props',this.props)
        return (
            <div>
                {(this.props.redirectTo&&this.props.redirectTo!=='/login')?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={(v)=>{this.handleChange('username',v)}}>Username</InputItem>
                        <InputItem onChange={(v)=>{this.handleChange('password',v)}} type='password'>Password</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin.bind(this)}>login</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register.bind(this)}>register</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;




















