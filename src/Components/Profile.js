import React, { Component } from 'react';
import Header from './header'
import '../styles/Profile.css';
import NotFoundPage from './NotFoundPage';
import PictureModal from './PictureModal';


class Profile extends Component{
  constructor(props){
    super(props);
    console.log('wecf');
    this.userId = this.props.userId;
    this.state= {
      user:{
        userId:undefined,
        userName:undefined,
        userDesc:undefined,
        userDPUrl:undefined
      },
      isComplete: false,
      rows:[],
      modalIsOpen: false,
      modalObj:{
        _id: undefined,
        url: undefined,
        title: undefined,
        likes: undefined,
        liked: undefined,
        comments: []
      }
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.likePicture = this.likePicture.bind(this);
  }
  

  openModal(e){
    this.setState({
      modalIsOpen: true, 
      modalObj:{
        _id: e._id,
        url: e.url,
        title: e.title,
        likes: e.likes,
        liked: e.liked,
        comments: e.comments
      }
    });
  }
  closeModal(){
    this.setState({
      modalIsOpen: false, 
      modalObj:{
        url: undefined,
        title: undefined,
        comments: []
      }
    });
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //document.getElementById("container_fluid").style.overflow = "hidden";
  }
  
  likePicture(){
    let modalObj = this.state.modalObj;
    let val = modalObj.liked===0 ? 1 : 0;
    modalObj.liked= val;
    modalObj.likes = val===0 ? --modalObj.likes : ++modalObj.likes;
    //this.setState({modalObj});
    let rows = this.state.rows;
    let objIndex = rows.findIndex((obj => obj._id === modalObj._id));
    rows[objIndex].likes = modalObj.likes;
    rows[objIndex].liked = modalObj.liked;
    this.setState({rows});
    
    let data = rows[objIndex];
    const url = 'https://instagram-data-source.herokuapp.com/api/post/like'
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(console.log('Success'));
  } 

  postComment = (comment) => {
    let modalObj = this.state.modalObj;
    let commentObj = {
        userId: 'runabh',
        comment: comment
    }
    modalObj.comments.push(commentObj);
    let rows = this.state.rows;
    let objIndex = rows.findIndex((obj => obj._id === modalObj._id));
    rows[objIndex].comments = modalObj.comments;
    this.setState({rows});

    
    const url = 'https://instagram-data-source.herokuapp.com/api/post/comment'
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(modalObj), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(console.log('Success'));
}

  componentDidMount(){
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
    }).then(() => {
      this.setState({isComplete:true});
    });

  }

  render(){
    console.log('render');
    if(this.state.isComplete){
      if(this.state.user[0] === undefined){
        return(
          <div className="container-fluid" id="container_fluid">
          <Header />
          <NotFoundPage />
          </div>
        );
      }
      
      else{
       
      return(
        
          <ProfileChild 
          user={this.state.user}
          rows={this.state.rows}
          modalObj={this.state.modalObj}
          modalIsOpen={this.state.modalIsOpen}
          openModal={this.openModal}
          onAfterOpen={this.afterOpenModal}
          closeModal={this.closeModal}
          likePicture={this.likePicture}
          postComment={this.postComment}
          />
          );
      }
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
}

const ProfileChild = (props) => {
  
  const openModal = (e) => {
    props.openModal(e);
  }
  if(props.rows.length > 0){
    return(
      <div className="container-fluid" id="container_fluid">
        <Header />
        <div className="profileFeed">
        <div className="row justify-content-md-center mt-4">
          <div className="col-sm-6"><img src={props.user[0].userDPUrl} alt="" className="rounded-circle img-fluid mx-auto d-block" style={{width:180}} /></div>
          <div className="col-sm-6 text-sm-left text-center mt-4">
           <h2 >{props.user[0].userId} </h2>
            <p><strong>{props.rows.length}</strong> posts</p>
            <h6>{props.user[0].userName} </h6>
            <p>{props.user[0].userDesc} </p>
          </div>
        </div>
      
        <div className="row mt-4 mx-n1">
        {props.rows.map((obj, index) => (
          <div key={obj._id} className="col-4 mt-2 px-1">
          <img src = {obj.url} alt="text" className="img-fluid" onClick={openModal.bind(this, obj)} />
          </div>
          
        ))}
        <PictureModal 
          modalIsOpen={props.modalIsOpen} 
          closeModal={props.closeModal}
          onAfterOpen={props.onAfterOpen}
          modalObj={props.modalObj}
          userId={props.user[0].userId}
          likePicture={props.likePicture}
          postComment={props.postComment}>
          </PictureModal>
        </div>
        </div>   
      </div>
    );
  }
  else{
    return(
      <div className="container">
        <Header />
        <div className="profileFeed">
        <div className="row justify-content-md-center mt-4">
          <div className="col-sm-6"><img src={props.user[0].userDPUrl} alt="" className="rounded-circle img-fluid mx-auto d-block" style={{width:180}} /></div>
          <div className="col-sm-6 text-sm-left text-center mt-4">
           <h2 >{props.user[0].userId} </h2>
            <p><strong>{props.rows.length}</strong> posts</p>
            <h6>{props.user[0].userName} </h6>
            <p>{props.user[0].userDesc} </p>
          </div>
        </div>
        <div className="row mt-5">
        <div className="col text-center">
        <h1 className="display-4">No posts yet</h1>
        </div>
        </div>
      </div>
      </div>
    );
  
  }
}

 export default Profile;