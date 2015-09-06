import FormComponent from './../components/FormComponent.js';


export default class LoginForm extends FormComponent 
{
    constructor(props) {
        super(props)
        this.url = '/api/v1/login';
        this.fields = [
            {name:'username', label:'Email/username', placeholder: 'Enter email/username'},
            {name:'password', type:'password', label:'Password', placeholder: 'Enter password'}
        ]
    }

    onSuccess(data) {
        ocfnet.setState({ user: data });
        super.onSuccess(data);
    }
}