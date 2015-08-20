import React from 'react';
import { Nav, Navbar, NavItem, DropdownButton, MenuItem } 
  from 'react-bootstrap';

import ee from './../Emitter.js';


export default class NavbarComponent extends React.Component
{
  constructor(props) {
    super(props)
    this.state = window.APP_DATA
    ee.addListener('app_data', this.setData.bind(this));
  }  

  setData(data) {
    this.setState(data);
  }

  render() { 
    if (!this.state)
      this.getInitialState();
    var userNav = this.state.authed ? ( 
      <Nav right>
        <DropdownButton eventKey={3} title={<span>{this.state.username}</span>} right>
            <MenuItem eventKey={1} href='/logout'>Logout</MenuItem>
        </DropdownButton>
      </Nav>
    ) : (
      <Nav right>
        <NavItem eventKey={1} href='/login'>Login</NavItem>
      </Nav>
    )
    return (
      <Navbar brand='OCFnet' inverse>
        <Nav>
          <NavItem eventKey={1} href='/home'>Home</NavItem>
          <NavItem eventKey={2} href='/media'>Media</NavItem>
        </Nav>
        {userNav}
      </Navbar>
    )
  }
}