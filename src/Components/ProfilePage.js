import React, { Component } from 'react';
import {withRouter} from 'react-router';
import Profile from './Profile'

export default class ProfilePage extends Component{
    constructor(props){
        super(props);
        this.userId = this.props.match.params.id;
      }
      
      render(){
            const ProfilewithRouter = withRouter(Profile);
          let userId = this.props.match.params.id;
          
          return(
              <ProfilewithRouter userId = {userId} location={this.props.location} />
          )
      }
}   