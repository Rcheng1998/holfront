import './App.css';
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Game from './components/Game.js'

class App extends React.Component{
  state = {
    clipList: [],
    isLoaded: false,
    test: 'false'
  };

  componentDidMount(){
    this.getClip();
  }

  async getClip(){
    const res = await axios.get("http://localhost:5000/get/twitchClips")
    let response = res
    this.setState({clipList: response.data})
    if(this.state.clipList.data.length > 0){
      console.log('in changed state')    
      this.setState({isLoaded: true})
      this.setState({test: 'true'})
    }
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
