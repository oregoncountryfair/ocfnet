import React from 'react';
import xhttp from 'xhttp';
import {Modal, Button, Input, Alert} from 'react-bootstrap';

import ee from './../Emitter.js';

import ModalComponent from '../ui/ModalComponent.js'

export default class RegisterModal extends ModalComponent
{
    constructor(props) {
        super(props)
        ee.addListener('push_state:/register', this.open.bind(this));
    }

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
        .then(this.onRegisterSuccess.bind(this))
        .catch(this.onRegisterFailure.bind(this));
    }

    onRegisterSuccess(data) {
        ee.emit('update_app_data', data);
        this.close();
    }

    onRegisterFailure(data) {
        if (data) {
            this.setState({ errors: data });
        }
    }

    render() {
        var errors = this.state.errors;
        this.state.errors = null;
        let get_error = (name) => {
            if (errors && errors[name])
                return (
                    <Alert bsStyle='danger'>{errors[name]}</Alert>
                )
            return null;
        }
        return (   
            <Modal show={this.state.show} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Input type='text' label='Username' placeholder='Username' name='username' />
                        {get_error('username')}
                        <Input type='email' label='Email' placeholder='Email' name='email' />
                         {get_error('email')}
                        <Input type='password' label='Password' name='password' />
                         {get_error('password')}
                        <Input type='password' label='Repeat Password' name='confirm' />
                         {get_error('confirm')}
                    </form>
                    <hr/>
                    <div className="text-center">
                        Already registered? Login <a href="/login">here</a>.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                    <Button onClick={this.submit.bind(this)}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}