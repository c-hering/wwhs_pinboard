import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

export default class Navigation extends Component {

  render(){
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/" style={{color: '#009B9E',}}>WWHS Pinboard</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="/">
	   By Newest
	  </NavItem>
	  <NavItem eventKey={1} href="/hottest">
            By Popular
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
