import React, { Component } from 'react';


class AddComments extends Component{

    postComment = (e) => {
        e.preventDefault();
        const comment = e.target.elements.comment.value.trim();
        this.props.postComment(comment);
    }
    render(){
        return(
            <div className="row mt-2">
                <div className="col">
                    <form className="input-group input-group-sm mb-3" onSubmit={this.postComment}>
                        <input type="text" name="comment" className="form-control" placeholder="Add a comment..." />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary">Post</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddComments;