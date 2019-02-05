import React, { Component } from 'react';
import '../styles/picture.css'
import '../styles/page.css'
import '../styles/header.css'
import '../bootstrap/css/bootstrap.css'
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
        rows.push(picture);
      });
      this.setState({rows});
    });
    
  }
  render() {
    if(this.state.rows.length > 0){
    return (
      <div className="container-fluid">
      
      <Feed rows={this.state.rows} />
      
      </div>
    );
    }
    else{
      return(
        <div className="container">
        
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


export default App;
