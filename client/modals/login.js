import React from 'react';
import xhttp from 'xhttp';
import {Modal, Button, Input} from 'react-bootstrap';

var LoginModal = module.exports = React.createClass({

    getInitialState() {
        window.modal_instances['/login'] = this;
        return { show: false };
    },

    open() {
        this.setState({ show: true })
        window.ee.emit('modal_open', this);
    },

    close(noevent) {
        this.setState({ show: false });
        if (!noevent)
            window.ee.emit('modal_close', this);
    },

    submit() {
        var modal = this;
        var data = {
            username: document.querySelector('[name="username"]').value,
            password: document.querySelector('[name="password"]').value,
        }

        xhttp({
            url: '/login',
            method: 'post',
            headers: {
                'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').content
            },
            data: data
        })
    },

    render() {
        return (   
            <Modal show={this.state.show} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Input type='text' label='Username or Email' placeholder='Enter email/username' name='username' />
                        <Input type='password' label='Password' name='password' />
                    </form>
                    <hr/>
                    <div className="text-center">
                        Register for free <a href="/register">here</a>.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button onClick={this.submit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
});