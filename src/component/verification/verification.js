import React from 'react';

export default function verification(Comp) {

    return class WrapperComp extends React.Component{
        constructor(){
            super();
            this.state = {};
        }

        render(){
            return (
                <Comp handleChange={this.handleChange.bind(this)} state={this.state} ></Comp>
            )
        }
    }
}