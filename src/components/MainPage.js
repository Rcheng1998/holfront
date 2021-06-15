import React from 'react';
import {Button, Container, Row, Col, Form} from 'react-bootstrap';

class MainPage extends React.Component{
    render(){
        return(
            <div className='outer'>
                <div class="middle">
                    <div class="inner">
                        <Container>
                            <Row>
                            <h1 class="twitchFont">Twitch</h1>
                            <h1 class="twitchFont">High or Low</h1>
                            <p class="subTitle">Choose your favorite streamer and try to guess if their clip is higher or lower!</p>
                            </Row>
                            <Row>
                                <ul class="list">
                                    <li>
                                        <img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/99aa4739-21d6-40af-86ae-4b4d3457fce4-profile_image-70x70.png"></img>
                                    </li>
                                    <li>
                                        <img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/lilypichu-profile_image-9a1ba797a9721716-70x70.png"></img>
                                    </li>
                                    <li>
                                        <img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/bde8aaf5-35d4-4503-9797-842401da900f-profile_image-70x70.png"></img>
                                    </li>
                                    <li>
                                        <img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/xqcow-profile_image-9298dca608632101-150x150.jpeg"></img>
                                    </li>
                                    <li>
                                        <img alt="test1" src="https://static-cdn.jtvnw.net/jtv_user_pictures/ddd88d33-6c4f-424f-9246-5f4978c93148-profile_image-150x150.png"></img>
                                    </li>
                                    <li>
                                        <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/f3591dbe4ee3d94b-profile_image-150x150.png"></img>
                                    </li>
                                    <li>
                                        <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/beeafc17-3ebe-4e1d-b250-404f1ea56988-profile_image-150x150.png"></img>
                                    </li>
                                </ul>
                            </Row>
                            <Row>
                                <Col xs='9'>
                                    <Form>
                                        <Form.Group controlID='formStreamer'>
                                            <Form.Control type="lg" type="text" placeholder="Type Twitch Name Here"></Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col xs='3'>
                                    <Button variant="outline-light" type="submit" block>Play</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        )
    }

}

export default MainPage;