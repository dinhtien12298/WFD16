import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NewGame from './components/NewGame';
import NavBar from './components/NavBar';

class App extends Component {
  state = {

  }

  render() {
    return (
      <Container className="App">
        <NavBar />
        <NewGame />
      </Container>
    );
  }
}

export default App;
