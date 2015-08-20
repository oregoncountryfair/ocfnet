import React from 'react';

export default class HomePage extends React.Component
{
    render() { 
        var username = window.APP_DATA.authed ? window.APP_DATA.username : 'guest';
        return (<div>Welcome, {username}.</div>) }
}
