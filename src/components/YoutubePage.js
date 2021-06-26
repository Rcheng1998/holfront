import React from 'react';
import {Button, Container, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer.js'

class YoutubePage extends React.Component{
    state = {
        inputValue: "",
        outputID: ""
    }

    componentDidMount(){
        document.body.style.backgroundColor = "#770000"
    }

    // Tracks keyboard input in input box
    handleChange(event){
        try{
            let inputURL = new URL(event.target.value)
            if(inputURL){
                console.log('in handle change', inputURL)
    
                let inputSplit = (inputURL.pathname).split("/")
                console.log(inputSplit)
                this.setState({inputValue: inputSplit});
            }
        } catch(error){
            if(error instanceof TypeError){
                return;
            }
        }   
    }

    // Allows users to start the game with an enter keypress
    async handlekeyPress(event){
        if(event.key === 'Enter'){
            if(this.state.inputValue){
                console.log('in getting channel', this.state.inputValue)
                if(this.state.inputValue[1] === "user" || this.state.inputValue[1] === "c"){
                    const channelRes = await axios.get('https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forUsername=' + this.state.inputValue[2] + '&key=AIzaSyA8fghL1wGnRSZWJG37YpBfSqCLK1_mYzs',{
                        headers: {
                            'Accept': 'application/json',
                        }
                    });
                    console.log(channelRes.data)
                    console.log('id', channelRes.data.items[0].id)
                    this.setState({outputID: channelRes.data.items[0].id})
                }
                else{
                    this.setState({outputID: this.state.inputValue[2]})
                }
            }
            console.log('In handlekey press')
            return(
                this.props.history.push('/youtube/' + this.state.outputID)
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
                                <p class="subTitle">Paste the channel's URL in the text box below.</p>
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
                                <Col md='9'>
                                    <Form onSubmit={e => { e.preventDefault(); }} onKeyPress={this.handlekeyPress.bind(this)}>
                                        <Form.Group>
                                            <Form.Control type="text" onChange={this.handleChange.bind(this)} placeholder="Paste Youtube Channel URL or ChannelID"></Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md='3'>
                                    <Link to={'/twitch/'}>
                                        <Button variant="outline-light" block> <i class="far fa-play-circle"></i> Play</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
        )
    }

}

export default YoutubePage;