import React, { Component } from 'react';
import { Button,Alert } from 'react-bootstrap';

export default class WarningDismissable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: true
    };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if (this.state.show) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
          <h4>Please Read!</h4>
          <p>
            By visting this site you are susceptible to lude and/or foul language and ideas, this site is in no form responsible for
            what is posted, which will not be removed unless it be deemed a direct threat to a person or persons.

            All posts stay anonymous.

            Please do not post anything too bad. Have fun, we are not trying to get people hurt.
          </p>
          <p>
          </p>
        </Alert>
      );
    }
    return <Button onClick={this.handleShow}>Show Warning</Button>;
  }
}
