import React, { Component } from 'react';
import { Panel, Table, Well } from 'react-bootstrap';
import MessageRow from './MessageRow';


export default class PinContainer extends Component {

  rateUp = msgID => {
    console.log(msgID + " was pressed")
  }

  rateDown = msgID => {
    console.log(msgID + " was pressed")
  }

  getRowData = () => {
    var messages = [];
    for(var i = 0; i < 5; i++){
      messages.push(<MessageRow key={i} onRateUp={() => this.rateUp()} onRateDown={() => this.rateDown(i)} id={i} rating={Math.floor(Math.random() * 400)} message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />)
    }
    return <tbody>{messages}</tbody>;
  }

  renderSortBy = sortby => {
    if(sortby == 'newest'){
      console.log("Sorting messages by newest")
      return (
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Rating</th>
              <th>Message</th>
            </tr>
          </thead>
          {this.getRowData()}
        </Table>
      )
    }else{
      console.log("Sorting messages by hottest")
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
