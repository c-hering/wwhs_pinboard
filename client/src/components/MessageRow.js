import React, { Component } from 'react';
import { Table, Well, Glyphicon, Badge, Button } from 'react-bootstrap';
import BadgeRow from './BadgeRow';
export default class MessageRow extends Component {
  constructor(props) {
      super(props);
      this.state = {
        upPressed: false,
        downPressed: false,
        rating: this.props.rating
      };
  }

  onClickUp = () => {
    if(this.state.downPressed){
      this.setState({
        downPressed: false,
        upPressed: !(this.state.upPressed),
        rating: this.state.rating+2
      })
    }else{
      this.setState({
        upPressed: !(this.state.upPressed),
        rating: this.state.rating+1
      })
    }
    this.props.onRateUp()
  }

  onClickDown = () => {

    if(this.state.upPressed){
      this.setState({
        upPressed: false,
        downPressed: !(this.state.downPressed),
        rating: this.state.rating-2
      })
    }else{
      this.setState({
        downPressed: !(this.state.downPressed),
        rating: this.state.rating-1
      })
    }
    this.props.onRateDown()
  }

  render(){
    const tags = ["tag1","tag2","tag3"];
    return(
      <tr>
        <td>{this.props.id}</td>
        <td>
          <Button style={{color: '#009B9E',}} disabled={this.state.upPressed} onClick={this.onClickUp}>
            <Glyphicon glyph="chevron-up"/>
          </Button><br/>{this.state.rating}<br/>
          <Button style={{color: '#009B9E',}} disabled={this.state.downPressed} onClick={this.onClickDown}>
            <Glyphicon glyph="chevron-down"/>
          </Button>
        </td>
        <td>
          <Well style={{margin: 0,}}>{this.props.message}</Well>
          <BadgeRow badgeArr={tags}/>
        </td>
      </tr>
    );
  }
}
