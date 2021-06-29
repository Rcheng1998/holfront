import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'


class faqPage extends React.Component{
    state = {
        inputValue: ""

    }

    componentDidMount(){
        document.body.style.backgroundColor = '#6441A4'
    }

    render(){
        return(
        <div>
                <Container>
                    <Row>
                        <div className="faqTitle gameApp">
                            <h1>Fequently Asked Question(s)</h1>
                        </div>
                    </Row>
                    <Row className="faqBlock">
                        <h3 className="faqQuestion">Who are you?</h3>
                        <p>- I am in @RickC in chat and I am a recent graduate bored in the summer and looking to learn and create more interactive web applications.</p>
                    </Row>
                    <Row className="faqBlock">
                        <h3 className="faqQuestion">How did you make this website?</h3>
                        <p>- This website was made using the MERN stack (MongoDB, ExpressJS, React, NodeJS). I also use Twitch and Youtube's API to query clips and videos.</p>
                    </Row>
                    <Row className="faqBlock">
                        <h3 className="faqQuestion">The website gets stuck when I press one of the buttons!</h3>
                        <p>- This is one of random critical bugs that I am currently in progress of debugging and fixing. If you experience this bug, please DM on Twitter @RC98-17 with the Google Console (Control-Shift-[I]).</p>
                    </Row>
                    <Row className="faqBlock">
                        <h3 className="faqQuestion">My Youtube URL does not work!</h3>
                        <p>- Due to how Youtube handles channel names, if the URL contains the subdomain of /c/ or /users/, it may not be able to be searched by Youtube's API due to their naming convention. If you are able to find their channel ID, it will work.</p>
                    </Row>
                    <Row className="faqBlock">
                        <h3 className="faqQuestion">Will you add more websites for the game?</h3>
                        <p>- I will be happy to create more gamemode such as Facebook, Twitter, Instagram, etc. on popular requests. Let me know if you would like these gamemodes.</p>
                    </Row>
                    <div className="blockMobile"></div>
                </Container>
        </div>
        )
    }

}

export default faqPage;