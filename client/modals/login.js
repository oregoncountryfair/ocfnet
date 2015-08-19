import React from 'react';
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

    },

    render() {
        return (   
            <Modal show={this.state.show} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Input type='email' label='Username or Email' placeholder='Enter email/username' />
                        <Input type='password' label='Password' />
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