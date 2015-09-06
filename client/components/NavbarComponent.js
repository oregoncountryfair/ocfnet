import React from 'react';
import { Nav, Navbar, NavItem, DropdownButton, MenuItem } 
  from 'react-bootstrap';

import ee from './../Emitter.js';


export default class NavbarComponent extends React.Component
{
  constructor(props) {
    super(props)
    this.url_navbar_map = {
      '/': 'home',
      '/home': 'home',
      '/media': 'media'
    }
  }  

  render() { 
    if (this.props.user.username) {
      var userNameAndIcon = (
        <span>
          <span className="glyphicon glyphicon-user"></span>
          <span>{this.props.user.username}</span>
        </span>
      );
      var userNav = (
        <DropdownButton eventKey={3} title={userNameAndIcon} right>
            <MenuItem eventKey={1} href='/logout'>Logout</MenuItem>
        </DropdownButton>
      );
    } else {
      var userNav = (<NavItem eventKey={1} href='/login'>Login</NavItem>);
    }
    return (
      <Navbar brand='OCFnet' inverse fixedTop>
        <Nav>
          <NavItem eventKey={1} href='/home'>Home</NavItem>
          <NavItem eventKey={2} href='/media'>Media</NavItem>
        </Nav>
        <Nav right>
          {userNav}
        </Nav>
      </Navbar>
    )
  }
}