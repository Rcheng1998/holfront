import React from 'react';
import {Button, Container, Row, Col, Form, Popover, OverlayTrigger} from 'react-bootstrap';
import axios from 'axios'

class YoutubePage extends React.Component{
    state = {
        inputValue: "",
        outputID: ""
    }

    componentDidMount(){
        document.body.style.backgroundColor = "#710000"
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
            this.submitURL()
        }
    }

    async submitURL(){
        if(this.state.inputValue){
            console.log('in getting channel', this.state.inputValue)
            if(this.state.inputValue[1] === "user" || this.state.inputValue[1] === "channel"){
                const channelRes = await axios.get('https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forUsername=' + this.state.inputValue[2] + '&key=AIzaSyA8fghL1wGnRSZWJG37YpBfSqCLK1_mYzs',{
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                console.log(channelRes.data)
                console.log('id', channelRes.data.items[0].id)
                this.setState({outputID: channelRes.data.items[0].id})
            }
            else if(this.state.inputValue[1] === "c"){
                
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
                                <Col className="youtubeCol">
                                    <img className="youtubeImg" alt="youtubeImg" src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/YouTube.max-1100x1100.png"></img>
                                    <span className="youtubeText">Youtube</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>Paste your content creator's channel URL below.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="youtubeInputCol" md="1">
                                    <OverlayTrigger trigger="click" overlay={
                                        <Popover>
                                            <Popover.Title as="h3">Youtube Channel URL Help</Popover.Title>
                                            <Popover.Content>
                                                <img alt="popoverhelp" src="https://i.gyazo.com/50805a6f5724b3dce23d191a0bd9b32b.png"></img>
                                                <p>Go to your content creator's channel page and copy their URL.</p>
                                                <strong>This is not their display name in their videos.</strong>
                                                <hr></hr>
                                                <p>Note: some channel that have subdomains of /c/ may not work. Please use their channel ID.</p>
                                            </Popover.Content>
                                        </Popover>
                                    }>
                                        <Button variant="outline-light"><i class="fas fa-question"></i></Button>
                                    </OverlayTrigger>
                                </Col>
                                <Col className="youtubeInputCol" md='8'>
                                    <Form onSubmit={e => { e.preventDefault(); }} onKeyPress={this.handlekeyPress.bind(this)}>
                                        <Form.Group>
                                            <Form.Control type="text" onChange={this.handleChange.bind(this)} placeholder="Paste Youtube Channel URL or ChannelID"></Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col className="youtubeInputCol" md='3'>
                                    <Button onClick={() => this.submitURL()} variant="outline-light" block> <i class="far fa-play-circle"></i> Play</Button>
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

export default YoutubePage;