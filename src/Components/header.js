import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <div className="pageHeader">
                <div className="pageHeader-2">
                    <Link to="/">
                        <div className="glyphInsta"></div>
                        <div className="divider"></div>
                        <div className="insta-logo"></div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;