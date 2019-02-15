import React from 'react';
import Modal from 'react-modal';
import Comments from './Comments'
import AddComments from './AddComment'
import {Link} from 'react-router-dom';
Modal.setAppElement('#root')
const PictureModal = (props) => (
    <Modal
    isOpen={props.modalIsOpen}
    onRequestClose={props.closeModal}
    onAfterOpen={props.onAfterOpen}
    className="modal-dialog modal-lg modal-dialog-centered"
    >
    
    <div className="modal-content mt-4">
    
        <div className="modal-body">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <img src = {props.modalObj.url} onDoubleClick={props.likePicture} alt="text" className="img-fluid mx-auto pictureModal-img" ></img>
                    </div>
                    <div className="col-lg-4 px-1">
                        <div><p><strong><Link className="username" to={props.userId}>{props.userId}</Link></strong> {props.modalObj.title}</p></div>
                        <div className="">
                            <Comments commentsArr={props.modalObj.comments} />
                        </div>
                        <div className="pictureFooter">
                        <div className="row  mt-2">
                            <div className="col-1"><div onClick={props.likePicture} className={props.modalObj.liked===0 ? "glyph glyphHeart" : "glyph glyphHeart glyphHeart-liked"}></div></div>
                            <div className="col-1"><div className="glyph glyphComment"></div></div>
                            <div className="col-1"><div className="glyph glyphShare"></div></div>
                            <div className="col-1 offset-sm-7 offset-lg-5"><div className="glyph glyphSave"></div></div>
                        </div>
                        <div>
                            <p><strong>{props.modalObj.likes>0 ? props.modalObj.likes + ' likes' : ''} </strong></p>
                        </div>
                        <AddComments postComment={props.postComment} />
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </Modal>
);

export default PictureModal;