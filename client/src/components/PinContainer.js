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

  rate = (msgID, voteType) => {
    fetch("/rating",
    {
      headers: {
        'Content-Type' : 'application/json'
      },
      method: "POST",
      body: JSON.stringify({id: ''+msgID, vote: voteType})
    }).then(res => console.log(res))
  }

  fetchMessages = () => {
    var msgs = [];
    fetch('/messages/' + this.props.sortBy + '/' + this.state.page)
      .then(res => {
        res.json().then(msgJSON => {
          msgJSON.map((row,index) => {
            msgs.push(<MessageRow key={row.ID} onRateUp={() => this.rate(row.ID, 'up')} onRateDown={() => this.rate(row.ID,  'down')} id={index} rating={row.RATING} message={row.MSG}/>)
          })
        this.setState({messages: <tbody>{msgs}</tbody>})
      })
    })
  }

  componentDidMount = () => {
    this.fetchMessages()
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
