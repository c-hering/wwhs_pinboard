import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';

export default class BadgeRow extends Component {
  render(){
    const badges = this.props.badgeArr.map(title => {
      return <Badge style={{marginTop: 10, marginRight: 10, float: 'right'}}>{title}</Badge>
    })
    return(
      <div>
        {badges}
      </div>
    );
  }
}
