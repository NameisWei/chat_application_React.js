import React from 'react';
import {Grid,List} from 'antd-mobile';

export default class Avatar extends React.Component{
    constructor(){
        super();
        this.state={}
    }

    render(){
        const avatarList = 'boy,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
            .split(',')
            .map(v=>({
                icon:require(`../img/${v}.png`),
                text:v
            }))
        //console.log(avatarList)
        const gridHeader = this.state.icon
                            ?(<div>
                                <span>已选择头像</span>
                                <img src={this.state.icon} style={{width:20}} alt='' />
                              </div>):(<div>choose an avatar</div>)
        //console.log(this.state) icon text
        return(
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={elm=>{
                            //console.log(elm) icon text
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                        >头像选择</Grid>
                </List>
            </div>
        )
    }
}