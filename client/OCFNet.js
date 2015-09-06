import React from 'react';
import NotificationSystem from 'react-notification-system';
import xhttp from 'xhttp';

import NavbarComponent from './components/NavbarComponent.js';
import PagesComponent from './components/PagesComponent.js';

import LoginModal from './modals/LoginModal.js';
import RegisterModal from './modals/RegisterModal.js';
import UploadModal from './modals/UploadModal.js';

import ee from './Emitter.js';


class OCFNet extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {user: APP_DATA.user}
    }
    
    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
        const no_push_state = [
            '/logout'
        ];
        document.body.addEventListener('click', (e) => {
            var link = e.target;
            // Bubble up the chain to check for a link
            while (!link.pathname && link.parentNode)
                link = link.parentNode;

            if (link.className && link.className.indexOf('allow') != -1)
                return;

            // If there is a link, prevent the page change
            if (link.pathname)
                e.preventDefault();
            if (link.pathname && 
                link.className.indexOf('ignore') === -1 &&
                link.href.length > 0 && typeof link.hash === 'undefined') {
                var path = link.pathname;
                if (no_push_state.indexOf(link.pathname) == -1) {
                    history.pushState({}, '', link.pathname + link.search);
                }
                this.pathChange(path);
            }
        });
        window.onpopstate = () => {
            this.pathChange(document.location.pathname);
            
        }
        this.pathChange(document.location.pathname);
        ee.addListener('route:/logout', this.handleLogout.bind(this));

    }

    addNotification(data) {
        this.notificationSystem.addNotification(data);
    }

    handleLogout() {
        xhttp({
            url: '/api/v1/logout',
            method: 'post',
            headers: { 'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').content }
        })
        .then((data) => {
            this.setState({user: data});
        })
    }

    pathChange(path) {
        ee.emit('route:' + path);
    }

    render() {
        return (
            <div id="app">
                <NavbarComponent user={this.state.user} ref="navbarComponent"/>
                <PagesComponent user={this.state.user} ref="pageComponent"/>
                <LoginModal refs="loginModal"/>
                <RegisterModal refs="registerModal"/>
                <UploadModal refs="uploadModa"/>
                <NotificationSystem ref='notificationSystem' />
            </div>
        );
    }
}

window.ocfnet = React.render(<OCFNet/>, document.getElementById('entry'));

/*\
|*|
|*|  :: XMLHttpRequest.prototype.sendAsBinary() Polyfill ::
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#sendAsBinary()
\*/
if (!XMLHttpRequest.prototype.sendAsBinary) {
  XMLHttpRequest.prototype.sendAsBinary = function(sData) {
    var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
    for (var nIdx = 0; nIdx < nBytes; nIdx++) {
      ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
    }
    /* send as ArrayBufferView...: */
    this.send(ui8Data);
    /* ...or as ArrayBuffer (legacy)...: this.send(ui8Data.buffer); */
  };
}