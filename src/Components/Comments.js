import React from 'react';
import {Link} from 'react-router-dom';

const Comments = (props) => {
 return(
    
    <div className="row pictureComments">
    {props.commentsArr.map((obj, index) => (
      <div key={index} className="col-12">
      <Link className="username" to="/runabh1">{obj.userId}</Link> {obj.comment}
      </div>
    ))} 
    </div>
    
 );
}

export default Comments;

