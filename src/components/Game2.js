import React from 'react';
import { withRouter } from "react-router-dom"
import {Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios'
import data from '../test.json'
import Embed from './Embed'
import CountUp from 'react-countup'
import ReactLoading from 'react-loading';

class Game2 extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            name: "",
            clipList: data,
            apiClipList: [],
            leftClip: [],
            rightClip: [],
            gameScore: 0,
            loseState: false,
            isLoading: true,
            paraUsername: props.match.params,
            profilepic: ""
        };
    }

    async componentDidMount(){
        const {username} = this.props.match.params;
        this.setState({paraUsername: username})
        
        // calls api for clips of broadcaster
        await axios.get(`https://twitch-hol-backend.herokuapp.com/get/channel/` + username)
        .then(res => {
            const persons = res.data
            this.setState({apiClipList: persons})
            this.setState({isLoading: false})
            console.log('Api Loaded')
            console.log(this.state.apiClipList)
            
        });

        // calls api for broadcaster's display name and profile picture
        await axios.get(`https://twitch-hol-backend.herokuapp.com/get/profilepicture/` + username)
        .then(res => {
            const persons = res.data
            this.setState({profilepic: persons.data[0].profile_image_url})
            this.setState({name: persons.data[0].display_name})
        });

        this.setInitialGame()
    }

    setInitialGame(){
        // Set initial two clips
        let rand1 = Math.floor(Math.random() * this.state.apiClipList.data.length);
        let rand2 = Math.floor(Math.random() * this.state.apiClipList.data.length);

        console.log('leftclip', this.state.apiClipList.data)
        console.log('rightclip', this.state.apiClipList.data[rand2])

        this.setState({leftClip: this.state.apiClipList.data[rand1]})
        this.setState({rightClip: this.state.apiClipList.data[rand2]})
    }

    renderGameState(){
        let handleClick = e => this.checkViews(e.target.id)
        console.log('rendergamestate', this.state.rightClip.view_count)
        return(
        <Row>
            <Col>
                <Embed embedURL = {this.state.leftClip.embed_url}></Embed>
                <p class='clipTitle'>{this.state.leftClip.title}</p>
                <p>Views: {(this.state.leftClip.view_count)}</p>
            </Col>
            <Col>
                <Embed embedURL = {this.state.rightClip.embed_url}></Embed>
                <p class='clipTitle'>{this.state.rightClip.title}</p>
                <p id='rightViews' hidden={false}>Views: {this.state.rightClip.view_count}</p>
                <Button variant='outline-primary' id="higher" onClick={handleClick}>Higher</Button>
                <Button id="lower" onClick={handleClick}>Lower</Button>
            </Col>
        </Row>
        )
    }

    render(){
        if(this.state.isLoading){
            return(
                <div class="loading">
                    <h1>Loading game...</h1>
                    <ReactLoading class="spinning" type="spinningBubbles" color="white" height={'50%'} width={'50%'}></ReactLoading>
                </div>
            )
        }
        else{
            return(
                <div>
                    <Container>
                        <Row>
                            <h2 class='twitchFont'>High or Low</h2>
                            <div class="scoreBoard">
                                <img class="twitchNamePic" alt="" src={this.state.profilepic}></img>
                                <p class="twitchName">{this.state.name}</p>
                            </div>
                            <p class="gameScore">Game Score: {this.state.gameScore}</p>
                        </Row>
                        {this.renderGameState()}
                    </Container>
                </div>
            )
        }
    }
}

export default withRouter(Game2);