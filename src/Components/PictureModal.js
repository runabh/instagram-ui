import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root')
const PictureModal = (props) => (
    <Modal
    isOpen={props.modalIsOpen}
    onRequestClose={props.closeModal}
    className="modal-dialog modal-lg modal-dialog-centered"
    >
    
    <div className="modal-content">
    
        <div className="modal-body">
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <img src = {props.url} alt="text" className="img-fluid" ></img>
                    </div>
                    <div className="col-4">
                        <p><strong>{props.username}</strong> {props.title}</p>
                        <div className="pictureFooter">
                            <div className="pictureActions">
                                <div className="glyphHeart"></div>
                                <div className="glyphComment"></div>
                                <div className="glyphShare"></div>
                                <div className="glyphSave"></div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </Modal>
);

export default PictureModal;