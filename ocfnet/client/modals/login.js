import React from 'react';
import {Modal, Button, Input} from 'react-bootstrap';

var LoginModal = module.exports = React.createClass({

    getInitialState() {
        return { show: true };
    },

    close() {
        this.setState({ show: false });
    },

    submit() {

    },

    render() {
        window.modal_instances['/login'] = this;
        let close = e => this.setState({ show: false}); 
        return (   
            <Modal show={this.state.show} onHide={close}>
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
                    //<Button onClick={close}>Close</Button>
                    <Button onClick={this.submit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
});