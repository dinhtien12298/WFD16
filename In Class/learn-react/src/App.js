import React, { Component } from 'react';
import './App.css';

import CountNumber from "./components/CountNumber";

class App extends Component {
  state = {
    countNum: 0
  }

  addOne = () => {
    this.setState({ countNum: this.state.countNum + 1 });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CountNumber countNum = {this.state.countNum} updateCount = {this.addOne}/>
        </header>
      </div>
    );
  }
}

export default App;
