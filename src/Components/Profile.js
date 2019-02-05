import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Header from './header'
import '../styles/Profile.css';
import NotFoundPage from './NotFoundPage';
import PictureModal from './PictureModal';


class Profile extends Component{
  constructor(props){
    super(props);
    this.userId = this.props.match.params.id;
    this.state= {
      user:{
        userId:undefined,
        userName:undefined,
        userDesc:undefined,
        userDPUrl:undefined
      },
      rows:[],
      modalIsOpen: false,
      modalObj:{
        url: undefined,
        title: undefined,
        likes: undefined,
        liked: undefined
      }
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  

  openModal(e){
    this.setState({
      modalIsOpen: true, 
      modalObj:{
        url: e.url,
        title: e.title,
        likes: e.likes,
        liked: e.liked
      }

    });
  }
  closeModal(){
    this.setState({
      modalIsOpen: false, 
      modalObj:{
        url: undefined,
        title: undefined,
        likes: undefined,
        liked: undefined
      }
    });
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //document.getElementById("container_fluid").style.overflow = "hidden";
  }
  
  componentWillMount(){
    const apiUrl = 'https://instagram-data-source.herokuapp.com/api/feed/' + this.userId;
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      this.setState({user: data.user});
      let rows = [];
      data.pics.map((obj, index) => {
        rows.push(obj);
      });
      this.setState({rows: rows});
    });

  }

  render(){
    return(
    <ProfileChild 
    user={this.state.user}
    rows={this.state.rows}
    modalObj={this.state.modalObj}
    modalIsOpen={this.state.modalIsOpen}
    openModal={this.openModal}
    onAfterOpen={this.afterOpenModal}
    closeModal={this.closeModal}
    />
    );
  }
}

const ProfileChild = (props) => {
  
  const openModal = (e) => {
    props.openModal(e);
  }
  if(props.rows.length > 0){
    return(
      <div className="container-fluid" id="container_fluid">
        <Header />
        
        <div className="row justify-content-md-center mt-4">
          <div className="col-sm-6"><img src={props.user[0].userDPUrl} className="rounded-circle img-fluid mx-auto d-block" style={{width:180}} /></div>
          <div className="col-sm-6 text-sm-left text-center mt-4">
           <h2 >{props.user[0].userId} </h2>
            <p><strong>{props.rows.length}</strong> posts</p>
            <h6>{props.user[0].userName} </h6>
            <p>{props.user[0].userDesc} </p>
          </div>
        </div>
      
        <div className="row mt-4 mx-n1">
        {props.rows.map((obj, index) => (
          <div key={obj.id} className="col-4 mt-2 px-1">
          <img src = {obj.url} alt="text" className="img-fluid" onClick={openModal.bind(this, obj)} />
          </div>
          
        ))}
        <PictureModal 
          modalIsOpen={props.modalIsOpen} 
          closeModal={props.closeModal}
          onAfterOpen={props.onAfterOpen}
          modalObj={props.modalObj}
          userId={props.user[0].userId}>
          </PictureModal>
        </div>
         
      </div>
    );
  }
  else{
    return(
      <div className="container">
        <Header />
        <div className="row mt-5">
        <div className="col text-center">
        <div className="spinner-border text-secondary mt-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        </div>
        </div>
      </div>
    );
  
  }
}

 export default Profile;