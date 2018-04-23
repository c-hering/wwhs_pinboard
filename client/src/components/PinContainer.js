import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

export default class PinContainer extends Component {

  renderSortBy = sortby => {
    if(sortby == 'newest'){
      return 'Newest'
    }else{
      return 'Hottest'
    }
  }

  render(){
    return(
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.props.title}</Panel.Title>
          </Panel.Heading>
        <Panel.Body>
          {this.renderSortBy(this.props.sortBy)}
        </Panel.Body>
      </Panel>
    );
  }
}
