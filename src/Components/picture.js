import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Comments from './Comments';


class Picture extends Component{
    constructor(props){
        super(props);
        this.state={
            obj:this.props.obj
        }
        this.likePicture = this.likePicture.bind(this);
    }
  
    likePicture(){
        let obj = this.state.obj;
        let val = obj.liked===0 ? 1 : 0;
        obj.liked= val;
        obj.likes = val===0 ? --obj.likes : ++obj.likes;
        this.setState({obj});
      } 
    
    render(){
        
        
        return(
            
            <div className="picture">
            <div className="row">
                <div className="col-12 mt-sm-3 mt-2">
                    <div className="container-fluid">
                    <div className="row">
                    <div className="col-1"><img src={this.state.obj.userDPUrl} className="rounded-circle" style={{width:30}} /></div>
                    <div className="col-1"><Link className="username" to={this.state.obj.userId}>{this.state.obj.userId}</Link></div>
                    </div>
                    </div>
                </div>
                <div className="col-12 mt-sm-3 mt-2">
                    <img src={this.state.obj.url} alt="picture" onDoubleClick={this.likePicture}   />
                </div>
                <div className="col-12 mt-2">
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-1"><div onClick={this.likePicture} className={this.state.obj.liked===0 ? "glyph glyphHeart" : "glyph glyphHeart glyphHeart-liked"}></div></div>
                        <div className="col-1"><div className="glyph glyphComment"></div></div>
                        <div className="col-1"><div className="glyph glyphShare"></div></div>
                        <div className="col-1 offset-sm-8"><div className="glyph glyphSave"></div></div>
                    </div>
                    </div>
                </div>
                <div className="col-12 mt-2">
                    <div className="container-fluid">
                    <a><strong>{this.state.obj.likes>0 ? this.state.obj.likes + ' likes' : ''} </strong></a>
                    </div>
                </div>
                <div className="col-12">
                    <div className="container-fluid">
                    <Link className="username" to={this.state.obj.userId}>{this.state.obj.userId}</Link>
                    <a> {this.state.obj.title}</a>
                    </div>
                </div>
                <div className="col-12 mt-2">
                    <div className="container-fluid">
                        <Comments commentsArr={this.state.obj.comments} />
                    </div>
                </div>
                
            </div>
            </div>
            
            
        );
    }
}

export default Picture;