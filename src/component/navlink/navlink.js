import React from 'react';
import {TabBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


@withRouter
export default class NavLinkBar extends React.Component{

    render(){
        const navList = this.props.data.filter(v=>!v.hide);
        const {pathname} = this.props.location;
        //console.log('navlink.js',navList)
        return (
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname === v.path}
                        onPress={()=>{this.props.history.push(v.path)}}
                    ></TabBar.Item>
                ))}
            </TabBar>
        )
    }
}