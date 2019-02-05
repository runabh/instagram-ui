import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import glyph from '/img/f86e62b5d0c7.png';
// const style = {
//     backgroundImage: "url("+glyph+")"
// };

class Picture extends Component{
    render(){
        const {props} = this.props;
        return(
            <div className="feed">
            <div className="picture">
            <div className="pictureHeader">
            <Link to={props.userId} className="username">{props.userId}</Link>
            </div>
            <img src={props.url} alt="text" />
            <div className="pictureFooter">
            <div className="pictureActions">
            <div className={props.liked==0 ? "glyphHeart" : "glyphHeart glyphHeart-liked"}></div>
            <div className="glyphComment"></div>
            <div className="glyphShare"></div>
            <div className="glyphSave"></div>
            </div>
            <p><strong>{props.likes>0 ? props.likes + ' likes' : ''} </strong></p>
            <Link to={props.userId} className="username">{props.userId}</Link>
            <a className="title"> {props.title}</a>
            </div>
            </div>
            </div>
        );
    }
}

export default Picture;