import React from 'react';

export default class HomePage extends React.Component
{
    render() { 
        return (<div>Welcome, {this.props.user.username || 'guest'}.</div>) }
}
