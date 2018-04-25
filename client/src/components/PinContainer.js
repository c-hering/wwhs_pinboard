import React, { Component } from 'react';
import { Panel, Table, Well } from 'react-bootstrap';
import MessageRow from './MessageRow';


export default class PinContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {messages: []};
  }

  rateUp = msgID => {
    console.log(msgID + " was pressed")
  }

  rateDown = msgID => {
    console.log(msgID + " was pressed")
  }

  componentDidMount = () => {
    var msgs = [];
    fetch('/messages')
      .then(res => {
        res.json().then(msgJSON => {
          msgJSON.map((row,index) => {
            console.log(row.ID, row.RATING, row.MSG)
            msgs.push(<tbody><MessageRow key={row.ID} onRateUp={() => this.rateUp(row.ID)} onRateDown={() => this.rateDown(row.ID)} id={index} rating={row.RATING} message={row.MSG}/></tbody>)
          })
        this.setState({messages: msgs})
      })
    })
  }

  render(){
    return(
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.props.title}</Panel.Title>
          </Panel.Heading>
        <Panel.Body>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Rating</th>
                <th>Message</th>
              </tr>
            </thead>
            {this.state.messages}
          </Table>
        </Panel.Body>
      </Panel>
    );
  }
}
