import EventEmitter from 'events';
import React from 'react';
import Router from 'react-router';
import Modal from 'react-bootstrap';

import './ui/navbar.js'

import Home from './pages/home.js';
import LoginModal from './modals/login.js';


var Route = Router.Route;
var RouteHandler = Router.RouteHandler

var modal_routes = [
    '/login'
]

class App extends React.Component
{
    render() {
        return (<RouteHandler/>)
    }
}

var page_routes = (
    <Route handler={App}>
        <Route handler={Home} path="/" />
        <Route handler={LoginModal} path="login" /> 
    </Route>
);
var page_router = Router.create({
    routes: page_routes, 
    location: Router.HistoryLocation
}); 
page_router.run((Root) => {
    var modal = modal_routes.indexOf(document.location.pathname);
    React.render(<Root/>, document.getElementById(modal ? 'app' : 'modals'));
});

document.body.addEventListener('click', (e) => {
    if (e.target.pathname) {
        history.pushState({}, '', e.target.pathname);
        page_router.refresh();
        e.preventDefault();
    }
});
