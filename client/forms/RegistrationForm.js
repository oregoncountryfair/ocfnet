import React from 'react';
import FormComponent from './../components/FormComponent.js';


export default class RegistrationForm extends FormComponent 
{
    constructor(props) {
        super(props)
        this.url = '/api/v1/register';
        this.fields = [
            {name:'email', label:'Email Address', placeholder: 'Enter email address'},
            {name:'username', label:'Username', placeholder: 'Enter username'},
            {name:'password', type:'password', label:'Password', placeholder: 'Enter password'},
            {name:'confirm', type:'password', label:'Repeat Password', placeholder: 'Repeat password'}
        ]
    }

    onSuccess(data) {
        ocfnet.setState({ user: data });
        super.onSuccess(data);
    }
}