import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

export default class Navigation extends Component {

  render(){
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">WWHS Pinboard</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="/hottest">
            Hottest
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
