import EventEmitter from 'events';
import React from 'react';
import Router from 'react-router';
import Modal from 'react-bootstrap';

import './ui/navbar.js';

import Home from './pages/home.js';
import LoginModal from './modals/login.js';
import RegisterModal from './modals/register.js';

var Route = Router.Route;
var RouteHandler = Router.RouteHandler
var ee = window.ee = new EventEmitter();

var open_modal = null;
window.ee.addListener('modal_open', (modal) => {
    if (open_modal) {
        open_modal.close(true);
    }
    open_modal = modal;
})
window.ee.addListener('modal_close', (modal) => {
    if (history.length > 0)
        history.go(-1);
    else
        history.pushState({}, '', '/home');
    open_modal = null;
});   
window.modal_instances = {}
React.render(<div>
    <RegisterModal/>,
    <LoginModal/>
</div>, document.getElementById('modals'));


class App extends React.Component
{
    render() {
        return (<RouteHandler/>)
    }
}

class NoopRoute extends React.Component { render() { return null }}

var routes = (
    <Route handler={App}>
        <Route handler={Home} path="/home" />
    </Route>
);
var router = window.router = Router.create({
    routes: routes, 
    location: Router.HistoryLocation
}); 
router.run((Root) => {
    React.render(<Root/>, document.getElementById('app'));
});

document.body.addEventListener('click', (e) => {
    if (e.target.pathname) {
        e.preventDefault();
        history.pushState({}, '', e.target.pathname);
        if (Object.keys(modal_instances).indexOf(document.location.pathname) !== -1) {
            modal_instances[document.location.pathname].open();
            return;
        }
        try {
            router.refresh();
        } catch (ex) {
            console.error(ex);
        }
    }
});

if (Object.keys(modal_instances).indexOf(document.location.pathname) !== -1) {
    modal_instances[document.location.pathname].open();
    React.render(<Home/>, document.getElementById('app'));
}