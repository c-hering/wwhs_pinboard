import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import PinContainer from './PinContainer';
export default class Hottest extends Component {

  render(){
    return(
      <div style={{margin: 'auto', width: '80%', padding: 10}}>
        <PageHeader>Popular Posts</PageHeader>
        <PinContainer title="Most Popular" sortBy="rating"/>
      </div>
    );
  }
}
