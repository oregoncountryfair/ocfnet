import EventEmitter from 'events';
import React from 'react';
import Router from 'react-router';
import Modal from 'react-bootstrap';

import './ui/navbar.js';

import Home from './pages/home.js';
import LoginModal from './modals/login.js';


var Route = Router.Route;
var RouteHandler = Router.RouteHandler

window.modal_instances = {}
React.render(<LoginModal/>, document.getElementById('modals'));

class App extends React.Component
{
    render() {
        return (<RouteHandler/>)
    }
}

class NoopRoute extends React.Component { render() { return null }}

var page_routes = (
    <Route handler={App}>
        <Route handler={Home} path="/home" />
        <Route handler={NoopRoute} path="login" /> 
    </Route>
);
var page_router = Router.create({
    routes: page_routes, 
    location: Router.HistoryLocation
}); 
page_router.run((Root) => {
    if (Object.keys(modal_instances).indexOf(document.location.pathname) !== -1) 
        modal_instances[document.location.pathname].setState({ show: true });
    else  
        React.render(<Root/>, document.getElementById('app'));
});

document.body.addEventListener('click', (e) => {
    if (e.target.pathname) {
        history.pushState({}, '', e.target.pathname);
        page_router.refresh();
        e.preventDefault();
    }
});
