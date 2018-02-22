import React from 'react';
import logoImg from './logo.jpg';
import './logo.css';

export default class Logo extends React.Component{
    render(){
        return (
            <div className='logo-container'>
                <img src={logoImg} style={{width:300,height:300,marginLeft:5}} alt='' />
            </div>
        )
    }
}