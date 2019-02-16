import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Comments from './Comments';
import AddComments from './AddComment';


class Picture extends Component{
    constructor(props){
        super(props);
        this.state={
            obj:this.props.obj,
            focused: false
        }
        this.likePicture = this.likePicture.bind(this);
    }
  
    likePicture(){
        let obj = this.state.obj;
        let val = obj.liked===0 ? 1 : 0;
        obj.liked= val;
        obj.likes = val===0 ? --obj.likes : ++obj.likes;
        this.setState({obj});
        
        
        const url = 'https://instagram-data-source.herokuapp.com/api/post/like'
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(obj), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(console.log('Success'));
    } 

    postComment = (comment) => {
        let obj = this.state.obj;
        let commentObj = {
            userId: 'runabh',
            comment: comment
        }
        obj.comments.push(commentObj);
        this.setState({obj});

        const url = 'https://instagram-data-source.herokuapp.com/api/post/comment'
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(obj), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(console.log('Success'));
    }
    focus = () => {
        this.setState({focus: true});
    }
    render(){
        
        
        return(
            
            <div className="picture">
            <div className="row">
                <div className="col-12 mt-sm-3 mt-2">
                    <div className="container-fluid">
                    <div className="row">
                    <div className="col-1"><img src={this.state.obj.userDPUrl} alt="" className="rounded-circle" style={{width:30}} /></div>
                    <div className="col-1"><Link className="username" to={this.state.obj.userId}>{this.state.obj.userId}</Link></div>
                    </div>
                    </div>
                </div>
                <div className="col-12 mt-sm-3 mt-2">
                    <img src={this.state.obj.url} className="mx-auto feed-img" alt="" onDoubleClick={this.likePicture}   />
                </div>
                <div className="col-12 mt-2">
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-1"><div onClick={this.likePicture} className={this.state.obj.liked===0 ? "glyph glyphHeart" : "glyph glyphHeart glyphHeart-liked"}></div></div>
                        <div className="col-1"><div onClick={this.focus} className="glyph glyphComment"></div></div>
                        
                    </div>
                    </div>
                </div>
                <div className="col-12 mt-2">
                    <div className="container-fluid">
                    <p><strong>{this.state.obj.likes>0 ? this.state.obj.likes + ' likes' : ''} </strong></p>
                    </div>
                </div>
                <div className="col-12">
                    <div className="container-fluid">
                    <Link className="username" to={this.state.obj.userId}>{this.state.obj.userId} </Link>
                    {this.state.obj.title}
                    </div>
                </div>
                <div className="col-12 mt-2">
                    <div className="container-fluid">
                        <Comments commentsArr={this.state.obj.comments} />
                        <AddComments postComment={this.postComment} />
                    </div>
                </div>
                
            </div>
            </div>
            
            
        );
    }
}

export default Picture;