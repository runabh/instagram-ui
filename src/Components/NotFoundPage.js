import React from 'react';

import {Link} from 'react-router-dom';


const NotFoundPage = () => (

    <div>
    <h1>Sorry, this page isn't available.</h1>
    <p>The link you followed may be broken, or the page may have been removed. Go back to
    <Link to="/"> Instagram</Link>.</p>
    </div>
);

export default NotFoundPage;