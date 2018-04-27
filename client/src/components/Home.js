import React, { Component } from 'react';
import { PageHeader,Panel,Alert } from 'react-bootstrap';
import PinContainer from './PinContainer';
import WarningDismissable from './WarningDismissable';

export default class Home extends Component {
  render(){
    return (
      <div style={{margin: 'auto', width: '80%', padding: 10}}>
        <PageHeader>Home</PageHeader>
        <div>
        <WarningDismissable/>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">About This Site</Panel.Title>
              </Panel.Heading>
            <Panel.Body>
              This site was created by <a href="https:\\c-hering.github.io">Caleb Hering</a>, it is a collection of 'pins' made up of
              messages sent to a number by Walt Whitman Students. <br/><br/> Posts can then be seen by the latest sent, or by the most popular.
            </Panel.Body>
          </Panel>
          <PinContainer title="Newest" sortBy="time"/>
        </div>
      </div>
    );
  }
}
