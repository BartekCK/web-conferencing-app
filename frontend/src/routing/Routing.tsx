import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// components
import Home from 'pages/home';

const Routing: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;
