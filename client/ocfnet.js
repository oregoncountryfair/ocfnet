import EventEmitter from 'events';
import React from 'react';
import Router from 'react-router';
import Modal from 'react-bootstrap';
import xhttp from 'xhttp';

import NavbarInstance from  './ui/navbar.js';

import Home from './pages/home.js';
import LoginModal from './modals/login.js';
import RegisterModal from './modals/register.js';

var Route = Router.Route;
var RouteHandler = Router.RouteHandler
var ee = window.ee = new EventEmitter();

var open_modal = null;
ee.addListener('modal_open', (modal) => {
    if (open_modal) {
        open_modal.close(true);
    }
    open_modal = modal;
})
ee.addListener('modal_close', (modal) => {
    if (history.length > 0)
        history.go(-1);
    else
        history.pushState({}, '', '/home');
    open_modal = null;
});   

let render_app = (Page) => {
    React.render((
        <div id="app">
            <NavbarInstance/>
            <div className="container">
                <Page/>
            </div>
            <RegisterModal/>
            <LoginModal/>
        </div>
    ), document.getElementById('entry'));
}

let routes = (
    <Route>
        <Route handler={Home} path="/home" />
    </Route>
);
let router = Router.create({
    routes: routes, 
    location: Router.HistoryLocation
}); 
router.run((Root) => { render_app(Root); });

let push_state = (path) => {
    return ee.emit('push_state:' + path);
}

let path_change = (path) => {
    if (push_state(path))
        return;
    try {
        router.refresh();
    } catch (ex) {
        console.error(ex);
    }
}

var no_push_state = [
    '/logout'
]

document.body.addEventListener('click', (e) => {
    if (e.target.pathname) {
        e.preventDefault();
        if (no_push_state.indexOf(e.target.pathname) == -1)
            history.pushState({}, '', e.target.pathname);
        path_change(e.target.pathname);
    }
});

if (push_state(document.location.pathname)) {
    history.replaceState({}, '', '/home');
    if (open_modal)
        history.pushState({}, '', document.location.pathname); 
    render_app(Home);
}
