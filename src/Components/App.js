import React, { Component } from 'react';
import '../styles/picture.css'
import '../styles/page.css'
import '../styles/header.css'
import Feed from './feed'

class App extends Component {
  state={
    rows : []
  }
  
  componentDidMount(){
    fetch('https://instagram-data-source.herokuapp.com/api/feed')
    .then(res => res.json())
    .then(data => {
      let rows = [];
      data.map((picture, index) => {
        rows.push({
          id: picture.id,
          userId: picture.userId,
          title: picture.title,
          url: picture.url
        });
      });
      this.setState({rows});
    });
    
  }
  render() {
    
    return (
      <div className="pageBody">
      
      <Feed rows={this.state.rows} />
      
      </div>
    );
  
  }
}


export default App;
