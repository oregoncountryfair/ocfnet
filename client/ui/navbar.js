import React from 'react';
import { Nav, Navbar, NavItem, DropdownButton, MenuItem } 
  from 'react-bootstrap';

export const navbarInstance = (
  <Navbar brand='OCF Intranet'>
    <Nav>
      <NavItem eventKey={1} href='/home'>Home</NavItem>
      <NavItem eventKey={2} href='/media'>Media</NavItem>
      
    </Nav>
    <Nav right>
      <NavItem eventKey={1} href='/login'>Login</NavItem>
    </Nav>
  </Navbar>
);

React.render(navbarInstance, document.getElementById('nav'));