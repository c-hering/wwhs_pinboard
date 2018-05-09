import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class PageNav extends Component {

  render(){
    return(
      <Button onClick={this.props.onPress} bsStyle="link">Load more...</Button>
    );
  }
};
