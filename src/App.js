import './App.css';
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row, Col} from 'react-bootstrap';

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

  renderList(){
    return(
      <iframe width="420" height="315" src={this.state.isLoaded ? this.state.clipList.data[0].embed_url + '&parent=streamernews.example.com' : this.state.test}></iframe>
      
    )
  }

  render(){
    return (
      <div className="App">
        {this.renderList()}
        <iframe
   src="https://clips.twitch.tv/embed?clip=IncredulousAbstemiousFennelImGlitch&parent=http://localhost:3000/&parent=localhost:3000"
   height="360"
   width="640"
   allowfullscreen="true">
</iframe>
      </div>
    );
  }
}

export default App;
