import React, { Component } from 'react';
import Profile from './Profile'

export default class ProfilePage extends Component{
    constructor(props){
        super(props);
        console.log('wecf');
        this.userId = this.props.match.params.id;
        
      }

      render(){
          let userId = this.props.match.params.id;
          return(
              <Profile userId = {userId} />
          )
      }
}   