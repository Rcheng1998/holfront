import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Game from './components/Game.js'
import MainPage from './components/MainPage.js'

class App extends React.Component{
  state = {
    clipList: [],
    isLoaded: false,
    test: 'false'
  };

  componentDidMount(){
    document.body.style.backgroundColor = "#6441A4"
  }

  render(){
    return (
      <div className="App">
        <Game></Game>
      </div>
    );
  }
}

export default App;
