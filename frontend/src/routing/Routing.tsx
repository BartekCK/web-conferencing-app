import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// components
import Home from 'pages/home';
import Conversation from 'pages/conversation';

const Routing: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/conversation/:slug" component={Conversation} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;
