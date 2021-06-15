import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Game from './components/Game.js'

class App extends React.Component{
  state = {
    clipList: [],
    isLoaded: false,
    test: 'false'
  };

  render(){
    return (
      <div className="App">
        <Game></Game>
      </div>
    );
  }
}

export default App;
