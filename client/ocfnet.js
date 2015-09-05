import React from 'react';
import Router, {Route, RouteHandler} from 'react-router';
import Modal from 'react-bootstrap';
import xhttp from 'xhttp';

import ee from './Emitter.js';

import NavbarComponent from  './components/NavbarComponent.js';

import HomePage from './pages/HomePage.js';
import MediaPage from './pages/MediaPage.js';

import LoginModal from './modals/LoginModal.js';
import RegisterModal from './modals/RegisterModal.js';


var current_layout;

let render_app = (Page) => {
    current_layout = (
        <div id="app">
            <NavbarComponent/>
            <div className="container">
                <Page/>
            </div>
            <RegisterModal/>
            <LoginModal/>
        </div>
    )
    React.render(current_layout, document.getElementById('entry'));
}
let rerender_app = () => {
    React.render(current_layout, document.getElementById('entry'));
}
ee.addListener('render', rerender_app);

ee.addListener('update_app_data', (data) => {
    window.APP_DATA = data;
    ee.emit('app_data', data);
    ee.emit('render');
})

let routes = (
    <Route>
        <Route handler={HomePage} path="/" />
        <Route handler={HomePage} path="/home" />
        <Route handler={MediaPage} path="/media" />
    </Route>
);
let router = Router.create({
    routes: routes, 
    location: Router.HistoryLocation
}); 
router.run((Root) => { render_app(Root); });

let emit_push_state = (path) => {
    return ee.emit('push_state:' + path);
}

var last_page = '/home';
const opened_modal = 1;
const rendered_page = 2;
let path_change = (path) => {
    if (emit_push_state(path))
        return opened_modal;
    last_page = path;
    try {
        ee.emit('close_open_modal');
        router.refresh();
    } catch (ex) {
        console.error(ex);
    }
    return rendered_page;
}

ee.addListener('modal_close', (modal) => {
    history.pushState({}, '', last_page);
    path_change(last_page);
});   

var no_push_state = [
    '/logout'
];

document.body.addEventListener('click', (e) => {
    if (e.target.pathname) {
        e.preventDefault();
        if (e.target.href === '#')
            return;
        if (no_push_state.indexOf(e.target.pathname) == -1) {
            history.pushState({}, '', e.target.pathname);
        }
        path_change(e.target.pathname);
    }
});

window.onpopstate = function() {
    if(path_change(document.location.pathname) == opened_modal)
        rerender_app();
}
if (emit_push_state(document.location.pathname)) {
    render_app(HomePage);
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
        ee.emit('update_app_data', data);
    })
});