import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Game from './components/Game.js'
import Game2 from './components/Game2.js'
import MainPage from './components/MainPage.js'
import NotFoundPage from './components/NotFoundPage'
import ReactGA from 'react-ga'

import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

ReactGA.initialize('UA-199826519-1');

class App extends React.Component{
  componentDidMount(){
    document.body.style.backgroundColor = "#6441A4"
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidUpdate = () => ReactGA.pageview(window.location.pathname + window.location.search);

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage}></Route>
            <Route path="/twitch/:username" component={Game2}></Route>
            <Route path="/test" component= { Game }></Route>
            <Route component={ NotFoundPage }></Route>
            <Redirect to='/404'></Redirect>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
