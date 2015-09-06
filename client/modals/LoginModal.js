import React from 'react';
import xhttp from 'xhttp';
import {Modal, Button, Input, Alert} from 'react-bootstrap';

import ee from './../Emitter.js';
import ModalComponent from './../components/ModalComponent.js';
import LoginForm from './../forms/LoginForm.js';


export default class LoginModal extends ModalComponent
{
    constructor(props) {
        super(props)
        ee.addListener('route:/login', this.open.bind(this));
    }

    componentDidUpdate() {
        if (this.refs.loginForm)
            this.refs.loginForm.ee.removeAllListeners('success')
                                  .addListener('success', this.onLoginSuccess.bind(this));
    }

    open() {
        super.open();
    }

    submit() {
        this.refs.loginForm.submit();
    }

    onLoginSuccess(data) {
        this.close();
    }

    render() {
        return (   
            <Modal show={this.state.show} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm ref="loginForm"/>
                    <hr/>
                    <div className="text-center">
                        Register for free <a href="/register">here</a>.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                    <Button onClick={this.submit.bind(this)}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
};
