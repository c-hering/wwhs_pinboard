import React, { Component } from 'react';
import { Panel, Table, Well } from 'react-bootstrap';
import MessageRow from './MessageRow';
import PageNav from './PageNav';


export default class PinContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        messages: [],
        tableLen: 0,
        page: 0
      };
  }

  rate = (msgID, voteType) => {
    fetch("http://localhost:3001/rating",
    {
      headers: {
        'Content-Type' : 'application/json'
      },
      method: "POST",
      body: JSON.stringify({id: ''+msgID, vote: voteType})
    }).then(res => console.log(res))
  }

  loadNew = () => {
    this.setState({
      page: this.state.page++
    })
    this.fetchMessages()
  }

  fetchMessagesLen = () => {
    fetch('http://localhost:3001/messages/length')
      .then(res => {
        return res.text()
      }).then(len => {
        this.setState({
          tableLen: parseInt(len/50)
        })
      })
  }

  fetchMessages = () => {
    var msgs = [];
    this.fetchMessagesLen()
    fetch('http://localhost:3001/messages/' + this.props.sortBy + '/' + this.state.page)
      .then(res => {
        return res.json()
      }).then(msgJSON => {
        msgJSON.map((row,index) => {
          msgs.push(<MessageRow key={row.ID} onRateUp={() => this.rate(row.ID, 'up')} onRateDown={() => this.rate(row.ID,  'down')} id={index} rating={row.RATING} message={row.MSG}/>)
        })
      this.setState({messages: this.state.messages.concat(msgs)})
    })
  }

  componentDidMount = () => {
    this.fetchMessages()
  }

  render(){
      const loadMessage = this.state.tableLen > 49 && this.state.tableLen%50 > this.state.page ? <PageNav onPress={() => this.loadNew()}/> : <h5>No more messages...</h5>
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
              <tbody>
                {this.state.messages}
              </tbody>
            </Table>
          </Panel.Body>
        {loadMessage}
        </Panel>
      );
  }
}
