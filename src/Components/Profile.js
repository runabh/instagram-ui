import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Header from './header'
import '../styles/Profile.css';
import NotFoundPage from './NotFoundPage';
import PictureModal from './PictureModal';


class Profile extends Component{
  constructor(props){
    super(props);
    this.username = this.props.match.params.id;
    this.state= {
      rows:[],
      modalIsOpen: false,
      modalUrl: undefined,
      modalTitle: undefined
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  

  openModal(e){
    this.setState({
      modalIsOpen: true, 
      modalUrl: e.url,
      modalTitle: e.title
    });
  }
  closeModal(){
    this.setState({
      modalIsOpen: false, 
      modalUrl:undefined,
      modalTitle: undefined
    });
  }
  
  componentWillMount(){
    const apiUrl = 'http://localhost:3000/api/feed/' + this.username;
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      let rows = [];
      data.map((obj, index) => {
        rows.push({
          id: obj.id,
          userId: obj.userId,
          title: obj.title,
          url: obj.url
        });
      });
      this.setState({rows});
    });

  }

  render(){
    return(
    <ProfileChild 
    rows={this.state.rows}
    username={this.username}
    modalIsOpen={this.state.modalIsOpen}
    openModal={this.openModal}
    closeModal={this.closeModal}
    modalUrl={this.state.modalUrl}
    modalTitle={this.state.modalTitle}
    />
    );
  }
}

const ProfileChild = (props) => {
  let pictureObj = {
    url: undefined,
    title: undefined
  };
  const openModal = (e) => {
    props.openModal(e);
  }
  if(props.rows.length > 0){
    return(
      <div className="container-fluid">
        <Header />
        <br /><br /><br /><br />
        <div className="row ">
        {props.rows.map((obj, index) => (
          <div key={obj.id} className="col-4 mt-3">
          <img src = {obj.url} alt="text" className="img-thumbnail" onClick={openModal.bind(this, obj)} />
          </div>
          
        ))}
        <PictureModal 
          modalIsOpen={props.modalIsOpen} 
          closeModal={props.closeModal}
          url={props.modalUrl}
          title={props.modalTitle}
          username={props.username}>
          </PictureModal>
        </div>
         
      </div>
    );
  }
  else{
    return(
      <div>
      <Header />
      <br /><br /><br /><br />
      <NotFoundPage />
      </div>
    );
  
  }
}

 export default Profile;