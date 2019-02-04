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
        rows.push({
          id: obj.id,
          userId: obj.userId,
          title: obj.title,
          url: obj.url
        });
      });
      this.setState({rows: rows});
    });

  }

  render(){
    return(
    <ProfileChild 
    user={this.state.user}
    rows={this.state.rows}
    userId={this.userId}
    modalIsOpen={this.state.modalIsOpen}
    openModal={this.openModal}
    onAfterOpen={this.afterOpenModal}
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
      <div className="container-fluid" id="container_fluid">
        <Header />
        <br />
        <div className="row justify-content-md-center">
        <div className="col-2"><img src={props.user[0].userDPUrl} className="rounded-circle img-fluid" /></div>
        <div className="col-4">
        <h2>{props.user[0].userId} </h2>
        <h6>{props.rows.length} posts 100 Followers 100 Following</h6>
        <h5>{props.user[0].userName} </h5>
        <p>{props.user[0].userDesc} </p>
        </div>
        </div>
        <br /><br /><br />
        <div className="row">
        {props.rows.map((obj, index) => (
          <div key={obj.id} className="col-4 mt-4">
          <img src = {obj.url} alt="text" className="img-thumbnail" onClick={openModal.bind(this, obj)} />
          </div>
          
        ))}
        <PictureModal 
          modalIsOpen={props.modalIsOpen} 
          closeModal={props.closeModal}
          onAfterOpen={props.onAfterOpen}
          url={props.modalUrl}
          title={props.modalTitle}
          userId={props.userId}>
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
