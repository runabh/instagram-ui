import React, { Component } from 'react';
import Header from './header'
import '../styles/Profile.css';

class Profile extends Component{
  constructor(props){
    super(props);
    this.username = this.props.match.params.id;
  }
  state= {
    rows:[]
  }
  
  componentDidMount(){
    const apiUrl = 'https://instagram-data-source.herokuapp.com/api/feed/' + this.username;
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      let rows = [];
      data.map((obj, index) => {
        console.log(obj);
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
    <div>
      <Header />
      <br /><br /><br /><br />
      <div className="profileFeed">
      {this.state.rows.map((obj, index) => (
        <div className="profileFeed-picture">
        <img src = {obj.url} alt="text" className="profileFeed-picture-img" />
        </div>
      ))}
      </div>
    </div>
  );
}
}
//     const Profile = (props) => (
  
//       <div>
//       <Header />
//       <br /><br /><br /><br />
//      {props.match.params.id}
//       </div>
   
  
//   );

 export default Profile;