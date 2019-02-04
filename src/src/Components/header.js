import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <nav className="navbar sticky-top navbar-light bg-light">
                <div className="navbar-brand">
                    <Link to="/">
                    <div className="glyphInsta"></div>
                    <div className="divider"></div>
                    <div className="insta-logo"></div>
                    </Link>
                </div>
            </nav>
        );
    }
}

export default Header;