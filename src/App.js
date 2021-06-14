import './App.css';
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

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
      <iframe title="test1" width="420" height="315" src={this.state.isLoaded ? this.state.clipList.data[0].embed_url + '&parent=streamernews.example.com' : this.state.test}></iframe>
      
    )
  }

  render(){
    return (
      <div className="App">
        {this.renderList()}
        <iframe
   title="test2"
   src="https://clips.twitch.tv/embed?clip=IncredulousAbstemiousFennelImGlitch&parent=https://unruffled-ardinghelli-9ad4d8.netlify.app/&parent=unruffled-ardinghelli-9ad4d8.netlify.app&parent=netlify.app"
   height="360"
   width="640"
   allowfullscreen="true">
</iframe>
      </div>
    );
  }
}

export default App;
