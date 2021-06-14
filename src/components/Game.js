import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import data from '../test.json'
import Embed from './Embed'

class Game extends React.Component{
    state = {
        name: "XQCOW Test",
        clipList: data,
        leftClip: [],
        rightClip: [],
        gameScore: 0,
        loseState: false,
    };

    componentDidMount(){
        this.setClips()
    }

    checkViews(id){
        console.log('button is clicked', id)
        if(id === 'higher'){
            console.log(this.state.clipList.data[0])
        }
    }

    setClips(){
        let rand1 = Math.floor(Math.random() * 100);
        let rand2 = Math.floor(Math.random() * 100);

        console.log('leftclip', this.state.clipList.data[rand1])
        console.log('rightclip', this.state.clipList.data[rand2])

        this.setState({leftClip: this.state.clipList.data[rand1]})
        this.setState({rightClip: this.state.clipList.data[rand2]})

        this.setState({name: this.state.clipList.data[rand1].broadcaster_name})
    }

    renderGameState(){
        let handleClick = e => this.checkViews(e.target.id)
        return(
        <Row>
            <Col>
                <Embed embedURL = {this.state.leftClip.embedURL}></Embed>
                <p>Views: {this.state.leftClip.view_count}</p>
            </Col>
            <Col>
                <Embed embedURL = {this.state.rightClip.embedURL}></Embed>
                <p id='rightViews' hidden={true}>Views: {this.state.rightClip.view_count}</p>
                <Button id="higher" onClick={handleClick}>Higher</Button>
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
                        <h1>{this.state.name}</h1>
                        <h2>Game Score: {this.state.gameScore}</h2>
                    </Row>
                    {this.renderGameState()}
                </Container>
            </div>
        )
    }
}

export default Game;