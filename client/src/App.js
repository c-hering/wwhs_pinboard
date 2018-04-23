import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Hottest from './components/Hottest';
import NotFound from './components/NotFound';
import Navigation from './components/Navigation';
import logo from './logo.svg';
import './App.css';
class App extends Component {

  // example for fetching information from backend
  // state = {pageTitle: "",}
  //
  // componentDidMount(){
  //   fetch('/test')
  //     .then(res => res.text())
  //     .then(pageTitle => this.setState({pageTitle}))
  // }

  render() {
    return (
      <div className="App">
        <div>
          <Navigation/>
        </div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/hottest' component={Hottest}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
