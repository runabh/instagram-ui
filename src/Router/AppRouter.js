import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import NotFoundPage from '../Components/NotFoundPage';
import App from '../Components/App';
import Profile from '../Components/Profile';

const AppRouter = () => (
    
<BrowserRouter>
    <div>
        <Switch>
            <Route path="/" component={App} exact={true} />
            <Route path="/:id" component={Profile} />
            <Route component={NotFoundPage} />
        </Switch>
    </div>
</BrowserRouter>
    );

export default AppRouter;