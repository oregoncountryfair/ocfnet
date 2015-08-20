import React from 'react';
import Router from 'react-router';
import Modal from 'react-bootstrap';
import xhttp from 'xhttp';

import ee from './ee.js';

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
    history.go(-1);
    path_change(document.location.pathname);
    open_modal = null;
});   

var current_layout;

let render_app = (Page) => {
    current_layout = (
        <div id="app">
            <NavbarInstance/>
            <div className="container">
                <Page/>
            </div>
            <RegisterModal/>
            <LoginModal/>
        </div>
    )
    React.render(current_layout, document.getElementById('entry'));
}
ee.addListener('render', () => {
    React.render(current_layout, document.getElementById('entry'));
});
ee.addListener('app_data', (data) => {
    window.APP_DATA = data;
    window.ui_navbar.setState(data);
    ee.emit('render');
})
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

ee.addListener('push_state:/logout', () => {
    xhttp({
        url: '/logout',
        method: 'post',
        headers: {
            'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').content
        }
    })

    .then((data) => {
        ee.emit('app_data', data);
    })
});