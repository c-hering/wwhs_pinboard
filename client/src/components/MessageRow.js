import React, { Component } from 'react';
import { Table, Well, Glyphicon, Button } from 'react-bootstrap';

export default class MessageRow extends Component {
  constructor(props) {
      super(props);
      this.state = {
        upPressed: false,
        downPressed: false};
  }

  onClickUp = () => {
    if(this.state.downPressed){
      this.setState({
        downPressed: false,
        upPressed: !(this.state.upPressed)
      })
    }else{
      this.setState({
        upPressed: !(this.state.upPressed)
      })
    }
    this.props.onRateUp
  }

  onClickDown = () => {
    if(this.state.upPressed){
      this.setState({
        upPressed: false,
        downPressed: !(this.state.downPressed)
      })
    }else{
      this.setState({
        downPressed: !(this.state.downPressed)
      })
    }
    this.props.onRateDown
  }

  render(){
    return(
      <tr>
        <td>{this.props.id}</td>
        <td>
          <Button style={{color: '#009B9E',}} disabled={this.state.upPressed} onClick={this.onClickUp}>
            <Glyphicon glyph="chevron-up"/>
          </Button><br/>{this.props.rating}<br/>
          <Button style={{color: '#009B9E',}} disabled={this.state.downPressed} onClick={this.onClickDown}>
            <Glyphicon glyph="chevron-down"/>
          </Button>
        </td>
        <td><Well style={{margin: 0,}}>{this.props.message}</Well></td>
      </tr>
    );
  }
}
