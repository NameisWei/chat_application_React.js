import React from 'react';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import {user} from "../../redux/user.redux";
import NavLinkBar from '../navlink/navlink.js'
import UserList from '../userlist/userlist.js'
import UserCenter from '../usercenter/usercenter.js'


@connect(
    state=>state
)
export default class Dashboard extends React.Component{

    render(){
        const {pathname} = this.props.location;
        const user = this.props.user;
        //console.log(this.props)//age avata sex username desc .......
        const navList = [
            {
                path:'/female',
                text:'Male',
                icon:'people',
                title:'Male',
                component:UserList,
                hide: user.sex == 'male'
            },
            {
                path:'/male',
                text:'Female',
                icon:'people',
                title:'Female',
                component:UserList,
                hide: user.sex == 'female'
            },
            {
                path:'/usercenter',
                text:'UserCenter',
                icon:'user',
                title:'User Center',
                component:UserCenter,
            }
        ]
        //console.log(navList)
        return (
            <div>
                <NavBar mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
                <div>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}