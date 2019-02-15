import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFoundPage from '../Components/NotFoundPage';
import App from '../Components/App';
import ProfilePage from '../Components/ProfilePage';

const AppRouter = () => (
    
<BrowserRouter>
    <div>
        <Switch>
            <Route path="/" component={App} exact={true} />
            <Route path="/:id" component={ProfilePage} />
            <Route component={NotFoundPage} />
        </Switch>
    </div>
</BrowserRouter>
    );

export default AppRouter;