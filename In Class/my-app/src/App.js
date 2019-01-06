import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CountNumber from './components/CountNumber';

class App extends Component {
  state = {
    countNum: 6
  }

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     countNum: 6
  //   }

  //   this.addOne = this.addOne.bind(this);
  // }

  addOne = () => {
    // const randomNum = Math.floor(Math.random()*100);
    this.setState({ countNum: this.state.countNum + 1 });
  }

  render() {
    console.log(this.state.countNumber);
    return (
      <div className="App">
        <header className="App-header">
          <CountNumber countNum={this.state.countNum}/>
          <br/>
          <button onClick={this.addOne}>Add 1</button>
        </header>
      </div>
    );
  }
}

export default App;
