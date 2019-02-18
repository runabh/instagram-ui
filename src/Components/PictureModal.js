import React, {Component} from 'react';
import Modal from 'react-modal';
import Comments from './Comments'
import AddComments from './AddComment'
import {Link} from 'react-router-dom';
Modal.setAppElement('#root')


class PictureModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            focused: false
        }
    }
    focus = () => {
        this.setState({focused: true});    
    }
    
    render(){
    
    return(
        <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
        onAfterOpen={this.props.onAfterOpen}
        className="modal-dialog modal-lg modal-dialog-centered"
        >
        
        <div className="modal-content mt-4">
        
            <div className="modal-body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <img src = {this.props.modalObj.url} onDoubleClick={this.props.likePicture} alt="text" className="img-fluid mx-auto pictureModal-img" ></img>
                        </div>
                        <div className="col-lg-4 px-1">
                            <div><p><strong><Link className="username" to={this.props.userId}>{this.props.userId}</Link></strong> {this.props.modalObj.title}</p></div>
                            <div className="">
                                <Comments commentsArr={this.props.modalObj.comments} />
                            </div>
                            <div className="pictureFooter">
                            <div className="row  mt-2">
                                <div className="col-1"><div onClick={this.props.likePicture} className={this.props.modalObj.liked===0 ? "glyph glyphHeart" : "glyph glyphHeart glyphHeart-liked"}></div></div>
                                <div className="col-1"><div onClick={this.focus} className="glyph glyphComment"></div></div>
                                
                            </div>
                            <div>
                                <p><strong>{this.props.modalObj.likes>0 ? this.props.modalObj.likes + ' likes' : ''} </strong></p>
                            </div>
                            <AddComments postComment={this.props.postComment} focused={this.state.focused} />
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </Modal>
        );
    }
    }
    
    export default PictureModal;