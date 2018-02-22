import React from 'react';
import axios from 'axios';
import {loadData} from '../../redux/user.redux.js'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

@connect(
    null,
    {loadData}
)
@withRouter
class AuthRoute extends React.Component{

    componentDidMount(){
        //console.log('authroute->',this.props);
        const publicUrl = ['/login','/register'];
        const pathname = this.props.location.pathname;
        if (publicUrl.indexOf(pathname)>-1){
            return null;
        }

        axios.get('/user/info')
            .then(res=>{
                if (res.status===200&&res.data.code===0){
                    this.props.loadData(res.data.data);
                }else{
                    this.props.history.push('/login');
                }
            })

    }
    render(){
        return null;
    }
}
export default AuthRoute;