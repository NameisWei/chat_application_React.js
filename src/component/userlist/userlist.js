import React from 'react';
import {List,WingBlank,WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {getUserList} from "../../redux/userlist.redux";


@connect(
    state=>state.chatuser,
    {getUserList}
)
export default class UserList extends React.Component{

    componentDidMount(){
        //console.log('UserList Component',this.props)
        let sex = this.props.location.pathname.split('/')[1]; // ["", "female"]
        if (sex=='male'){
            sex = 'female'
        }else if (sex = 'female'){
            sex = 'male'
        }
        //console.log(sex)//female
        this.props.getUserList(sex);
    }

    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
    }

    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.props.userlist.map(v=>(
                    v.avatar?(
                        <List key={v._id} onClick={()=>this.handleClick(v)}>
                            <Item thumb={require(`../img/${v.avatar}.png`)} extra={<span>{v.age}</span>}>
                                <Brief>{v.username}</Brief>
                            </Item>
                            <Item>
                                <Brief>Sex: {v.sex}</Brief>
                                <Brief>Country: {v.country}</Brief>
                                <Brief>Status: {v.desc}</Brief>
                            </Item>
                        </List>
                    ):null
                ))}
            </WingBlank>
        )
    }
}