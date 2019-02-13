import React from 'react';
import Picture from './picture';
import Header from './header'


    const Feed = (props) => {
    
    return (
      <div>
      <Header />
      {props.rows.map((obj, index) => (
        <div key={index}>
        <Picture obj = {obj} />
        </div>
      )
    )}
      </div>
    );
  
  }

export default Feed;