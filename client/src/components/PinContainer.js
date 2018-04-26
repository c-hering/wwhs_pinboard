import React, { Component } from 'react';
import { Panel, Table, Well } from 'react-bootstrap';
import MessageRow from './MessageRow';


export default class PinContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        messages: [],
        page: 0
      };
  }

  rateUp = msgID => {
    console.log(msgID + " was pressed")
    fetch("/rating",
    {
      headers: {
        'Content-Type' : 'application/json'
      },
      method: "POST",
      body: JSON.stringify({id: ''+msgID, vote: 'up'})
    }).then(res => console.log(res))
  }

  rateDown = msgID => {
    console.log(msgID + " was pressed")
    fetch("/rating",
    {
      headers: {
        'Content-Type' : 'application/json'
      },
      method: "POST",
      body: JSON.stringify({id: ''+msgID, vote: 'down'})
    }).then(res => console.log(res))
  }

  componentDidMount = () => {
    var msgs = [];
    fetch('/messages/' + this.props.sortBy + '/' + this.state.page)
      .then(res => {
        console.log(res)
        res.json().then(msgJSON => {
          msgJSON.map((row,index) => {
            msgs.push(<MessageRow key={row.ID} onRateUp={() => this.rateUp(row.ID)} onRateDown={() => this.rateDown(row.ID)} id={index} rating={row.RATING} message={row.MSG}/>)
          })
        this.setState({messages: <tbody>{msgs}</tbody>})
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
