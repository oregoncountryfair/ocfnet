import React from 'react';
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
                        <Input type='text' label='Username' placeholder='Username' />
                        <Input type='email' label='Email' placeholder='Email' />
                        <Input type='password' label='Password' />
                        <Input type='password' label='Repeat Password' />
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