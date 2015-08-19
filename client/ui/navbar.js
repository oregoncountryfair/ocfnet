import React from 'react';
import { Nav, Navbar, NavItem, DropdownButton, MenuItem } 
  from 'react-bootstrap';


var NavbarInstance = module.exports = React.createClass({
  getInitialState() {
    window.ui_navbar = this;
    return window.APP_DATA;
  },
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
      <Navbar brand='OCF Intranet' inverse>
        <Nav>
          <NavItem eventKey={1} href='/home'>Home</NavItem>
          <NavItem eventKey={2} href='/media'>Media</NavItem>
        </Nav>
        {userNav}
      </Navbar>
    )
  }
})
