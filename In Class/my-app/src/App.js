import React, { Component } from 'react';
// import imagesData from './data/imagesData.json';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from './axios';
import NavBar from './components/NavBar';
import GirlImage from './components/GirlImage'

class App extends Component {
  state = {
    images: []
  }

  componentDidMount() {
    axios
    .get("/api/images")
    .then(data => {
      console.log(data.data);
      setTimeout(() => {
        this.setState({ images: data.data });
      }, 1000);
    })
    .catch(err => console.log(err));
  }

  render() {
    const allImage = this.state.images.map(img => <GirlImage key={img._id} img={img} />)
    
    return (
      <div className="app">
        <NavBar img="this.state.images" />
        {allImage}
      </div>
    );
  }
}

export default App;
