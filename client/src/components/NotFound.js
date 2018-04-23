import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import notFoundGif from '../404gif.gif';

export default class NotFound extends Component {

  render(){
    return(
      <img src={notFoundGif} alt="loading..." style={{height: 'auto',width: 'auto'}}/>
    );
  }
}
