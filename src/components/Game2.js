import React from 'react';
import { withRouter } from "react-router-dom"
import {Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios'
import data from '../test.json'
import Embed from './Embed'
import ReactLoading from 'react-loading';
import CountUp from 'react-countup';

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
            profilepic: "",
            viewButtonToggle: false
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
        // set view button toggle and game state
        this.setState({viewButtonToggle: false})
        
        // Set initial two clips
        let rand1 = Math.floor(Math.random() * this.state.apiClipList.data.length);
        let rand2 = Math.floor(Math.random() * this.state.apiClipList.data.length);

        console.log('leftclip', this.state.apiClipList.data)
        console.log('rightclip', this.state.apiClipList.data[rand2])

        this.setState({leftClip: this.state.apiClipList.data[rand1]})
        this.setState({rightClip: this.state.apiClipList.data[rand2]})

        // Set gamescore to 0

        this.setState({gameScore: 0})
    }

    checkViews(id){
        // Enables button toggle for right clip's view count display
        this.setState({viewButtonToggle: true})

        // Check button click and compare the view count
        setTimeout( () => {
            if(id === 'higher'){
                if(this.state.leftClip.view_count < this.state.rightClip.view_count){
                    console.log('Correct!')
                    this.setState({gameScore: this.state.gameScore + 1})
                    this.winState()
                }
                else{
                    console.log('Wrong! leftclip:', this.state.leftClip.view_count, 'rightclip:', this.state.rightClip.view_count)
                    this.setInitialGame()
                    this.renderGameState()
                }
            }
            else if(id === 'lower'){
                if(this.state.leftClip.view_count > this.state.rightClip.view_count){
                    console.log('Correct')
                    this.setState({gameScore: this.state.gameScore + 1})
                    this.winState()
                }
                else{
                    console.log('Wrong! leftclip:', this.state.leftClip.view_count, 'rightclip:', this.state.rightClip.view_count)
                    this.setInitialGame()
                    this.renderGameState()
                }
            }
        }, 5000, [])
    }

    winState(){
        // Switches rightClip with leftClip
        this.setState({leftClip: this.state.rightClip})

        let rand2 = Math.floor(Math.random() * this.state.apiClipList.data.length);

        this.setState({rightClip: this.state.clipList.data[rand2]})

        this.renderGameState()

        this.setState({viewButtonToggle: false})
    }

    hideRightClipView(){
        return(
            <p id='rightViews' hidden={true}>Views: {this.state.rightClip.view_count}</p>
        );
    }

    showRightClipView(){
        console.log("In showRightView()")
        if(this.state.rightClip.view_count == null){
            return(
                <div>Test</div>
            );
        }
        else{
            return(
                <CountUp start={0} end={this.state.rightClip.view_count} separator={','} duration={5}></CountUp>
            );
        }
    }

    renderGameState(){
        let handleClick = e => this.checkViews(e.target.id)
        return(
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col md='5'>
                    <Embed embedURL = {this.state.leftClip.embed_url}></Embed>
                    <p class='clipTitle'>{this.state.leftClip.title}</p>
                    <p>Views: {this.state.leftClip.view_count ? this.state.leftClip.view_count.toLocaleString('en') : this.state.leftClip.view_count}</p>
                </Col>
                <Col className="centerArrow" md='auto'>
                    <Button className="gameButton" variant='outline-light' id="higher" onClick={handleClick}><i class="fas fa-arrow-up"></i> Higher</Button>
                    <Button className="gameButton" variant='outline-light' id="lower" onClick={handleClick}><i class="fas fa-arrow-down"></i> Lower</Button>
                </Col>
                <Col md='5'>
                    <Embed embedURL = {this.state.rightClip.embed_url}></Embed>
                    <p class='clipTitle'>{this.state.rightClip.title}</p>
                    <p>{this.state.viewButtonToggle ? this.showRightClipView() : this.hideRightClipView()}</p>
                </Col>
            </Row>
        </Container>
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
                    </Container>
                        {this.renderGameState()}
                </div>
            )
        }
    }
}

export default withRouter(Game2);