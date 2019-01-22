import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import App from './App';

const NotFoundPage = () => (

    <div>404!
    <Link to="/">Home</Link>
    </div>
);

export default NotFoundPage;