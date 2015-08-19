import React from 'react';
import xhttp from 'xhttp';
import {Modal, Button, Input} from 'react-bootstrap';

var RegisterModal = module.exports = React.createClass({

    getInitialState() {
        window.modal_instances['/register'] = this;
        return { show: false };
    },

    open() {
        this.setState({ show: true })
        window.ee.emit('modal_open', this);
    },

    close(noevent) {
        this.setState({ show: false });
        if(!noevent)
            window.ee.emit('modal_close', this);
    },

    submit() {
        var modal = this;
        var data = {
            username: document.querySelector('[name="username"]').value,
            email: document.querySelector('[name="email"]').value,
            password: document.querySelector('[name="password"]').value,
            confirm: document.querySelector('[name="confirm"]').value
        }

        xhttp({
            url: '/register',
            method: 'post',
            headers: {
                'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').content
            },
            data: data
        })
    },

    render() {
        let close = e => this.setState({ show: false}); 
        return (   
            <Modal show={this.state.show} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Input type='text' label='Username' placeholder='Username' name='username' />
                        <Input type='email' label='Email' placeholder='Email' name='email' />
                        <Input type='password' label='Password' name='password' />
                        <Input type='password' label='Repeat Password' name='confirm' />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button onClick={this.submit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
});