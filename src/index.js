import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './index.css';
import App from './App';
import Home from './components/home/home';
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/app" component={App} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
