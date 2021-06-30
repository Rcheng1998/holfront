import React from 'react';
import {Button, Container, Row, Col, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class TwitchPage extends React.Component{
    state = {
        inputValue: ""

    }

    componentDidMount(){
        document.body.style.backgroundColor = '#6441A4'
    }

    // Tracks keyboard input in input box
    handleChange(event){
        console.log('in handle change', event.target.value)
        this.setState({inputValue: event.target.value});
    }

    // Allows users to start the game with an enter keypress
    handlekeyPress = (event) => {
        if(event.key === 'Enter'){
            console.log('In handlekey press')
            return(
                this.props.history.push('/twitch/' + this.state.inputValue)
            )
        }
    }

    render(){
        return(
        <div>
            <div className='outer'>
                <div className="middle">
                    <div className="inner">
                        <Container>
                            <Row>
                                <Col md={12}>
                                    <h1 class="twitchFont">SOCIAL</h1>
                                    <h1 class="twitchFont">HIGH or LOW</h1>
                                </Col>
                            </Row>
                            <Row>
                                <p class="subTitle">Enter your favorite streamer and try to guess if their clip is higher or lower!</p>
                            </Row>
                            <Row>
                                <ul class="list">
                                    <li>
                                       <Link to="/twitch/summit1g"><img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/99aa4739-21d6-40af-86ae-4b4d3457fce4-profile_image-70x70.png"></img></Link>
                                    </li>
                                    <li>
                                        <Link to="/twitch/lilypichu"><img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/lilypichu-profile_image-9a1ba797a9721716-70x70.png"></img></Link>
                                    </li>
                                    <li>
                                        <Link to="/twitch/ludwig"><img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/bde8aaf5-35d4-4503-9797-842401da900f-profile_image-70x70.png"></img></Link>
                                    </li>
                                    <li>
                                        <Link to="/twitch/xqcow"><img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/xqcow-profile_image-9298dca608632101-150x150.jpeg"></img></Link>
                                    </li>
                                    <li>
                                        <Link to="/twitch/mizkif"><img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/ddd88d33-6c4f-424f-9246-5f4978c93148-profile_image-150x150.png"></img></Link>
                                    </li>
                                    <li>
                                        <Link to="/twitch/loltyler1"><img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/f3591dbe4ee3d94b-profile_image-150x150.png"></img></Link>
                                    </li>
                                    <li>
                                        <Link to="/twitch/pokimane"><img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/beeafc17-3ebe-4e1d-b250-404f1ea56988-profile_image-150x150.png"></img></Link>
                                    </li>
                                </ul>
                            </Row>
                            <Row>
                                <Col className="youtubeInputCol" md='9'>
                                    <Form onSubmit={e => { e.preventDefault(); }} onKeyPress={this.handlekeyPress}>
                                        <Form.Group>
                                            <Form.Control type="text" value={this.state.inputValue} onChange={this.handleChange.bind(this)} placeholder="Type Twitch Name Here"></Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col className="youtubeInputCol" md='3'>
                                    <Link to={'/twitch/' + this.state.inputValue}>
                                        <Button variant="outline-light" block> <i class="far fa-play-circle"></i> Play</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
        )
    }

}

export default TwitchPage;