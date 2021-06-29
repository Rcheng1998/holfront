import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'


class MainPage extends React.Component{
    state = {
        inputValue: ""

    }

    componentDidMount(){
        document.body.style.backgroundColor = '#6441A4'
    }

    render(){
        return(
        <div>
                    <div className="innerMain">
                        <Container>
                            <Row>
                                <Col md={6} className="leftTitle">
                                    <div className="mainPageTitle">
                                        <div className="twitchTitle">
                                            <h1 class="twitchFont">SOCIAL</h1>
                                            <h1 class="twitchFont">HIGH or LOW</h1>
                                        </div>
                                        <div className="mainPageSub">
                                            <hr className="mainHR"></hr>
                                            <p>Play a game of <span className="greenView">Higher</span> or <span className="redView">Lower</span></p>
                                            <p>of your favorite content creators</p>
                                            <p>🔨 by RickC</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <Row>
                                        <div className="gamePics">
                                            <Link to="/twitch">
                                                <img alt="twitch" src="https://blog.twitch.tv/assets/uploads/twitch-generic-email-1-1-1-1.jpg"></img>
                                            </Link>
                                            <div className="bottomBar">
                                                <p className="bottomBarText">Twitch Clips (Top 200)</p>
                                            </div>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="gamePics">
                                            <Link to="/youtube">
                                                <img alt="youtube" src="https://jungletopp.com/wp-content/uploads/2020/10/YouTube-Logo.jpg"></img>
                                            </Link>
                                            <div className="bottomBar">
                                                <p className="bottomBarText"> Youtube Videos (Lastest 500)</p>
                                            </div>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div className="blockMobile"></div>
                        </Container>
                    </div>
        </div>
        )
    }

}

export default MainPage;