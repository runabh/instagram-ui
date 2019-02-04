import React, { Component } from 'react';

class UserName extends Component{
    render(){
        const {uname} = this.props;
        return(
            <a>{uname}</a>
        );
    }
}

export default UserName;