import React from 'react';
import { useParams } from "react-router-dom"
import {Button, Container, Row, Col} from 'react-bootstrap';
import data from '../test.json'
import Embed from './Embed'
import CountUp from 'react-countup'

class Game extends React.Component{
    state = {
        name: "Default Name",
        clipList: data,
        apiClipList: [],
        leftClip: [],
        rightClip: [],
        gameScore: 0,
        loseState: false,
        isLoading: false
    };

    componentDidMount(){
        this.setClips()
        this.getTwitchClips()
    }

    getTwitchClips(){

    }

    checkViews(id){
        console.log('button is clicked', id)
        if(id === 'higher'){
            if(this.state.leftClip.view_count < this.state.rightClip.view_count){
                console.log('Correct!')
                this.setState({gameScore: this.state.gameScore + 1})
                this.nextClips()
            }
            else{
                console.log('Wrong! leftclip:', this.state.leftClip.view_count, 'rightclip:', this.state.rightClip.view_count)
            }
        }
        else if(id === 'lower'){
            if(this.state.leftClip.view_count > this.state.rightClip.view_count){
                console.log('Correct')
                this.setState({gameScore: this.state.gameScore + 1})
                this.nextClips()
            }
            else{
                console.log('Wrong! leftclip:', this.state.leftClip.view_count, 'rightclip:', this.state.rightClip.view_count)
            }
        }
    }

    setClips(){
        let rand1 = Math.floor(Math.random() * 100);
        let rand2 = Math.floor(Math.random() * 100);

        console.log('leftclip', typeof this.state.clipList.data[rand1])
        console.log('rightclip', this.state.clipList.data[rand2])

        this.setState({leftClip: this.state.clipList.data[rand1]})
        this.setState({rightClip: this.state.clipList.data[rand2]})

        this.setState({name: this.state.clipList.data[rand1].broadcaster_name})
    }

    nextClips(){
        this.setState({leftClip: this.state.rightClip})

        let rand2 = Math.floor(Math.random() * 100);

        this.setState({rightClip: this.state.clipList.data[rand2]})
    }

    renderGameState(){
        let handleClick = e => this.checkViews(e.target.id)
        return(
        <Row>
            <Col>
                <Embed embedURL = {this.state.leftClip.embed_url}></Embed>
                <p class='clipTitle'>{this.state.leftClip.title}</p>
                <p>Views:</p>
                <CountUp end={1200000} duration={5}></CountUp>
                
            </Col>
            <Col>
                <Embed embedURL = {this.state.rightClip.embed_url}></Embed>
                <p class='clipTitle'>{this.state.rightClip.title}</p>
                <p id='rightViews' hidden={true}>Views: {this.state.rightClip.view_count}</p>
                <Button variant='outline-primary' id="higher" onClick={handleClick}>Higher</Button>
                <Button id="lower" onClick={handleClick}>Lower</Button>
            </Col>
        </Row>
        )
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <h2 class='twitchFont'>High or Low</h2>
                        <div class="scoreBoard">
                            <img class="twitchNamePic" alt="twitchNametest" src="https://static-cdn.jtvnw.net/jtv_user_pictures/xqcow-profile_image-9298dca608632101-70x70.jpeg"></img>
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

export default Game;