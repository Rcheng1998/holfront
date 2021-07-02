import React from 'react';
import {Container, Row} from 'react-bootstrap';

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
                        <p>- Hi! I am in @RickC in chat and I am a recent graduate bored in the summer. I am looking to learn and create more interactive web applications. I do not earn any money off of this project, so if had fun with the game, feel free to tip me <a href="https://www.buymeacoffee.com/RickC">here</a></p>
                    </Row>
                    <Row className="faqBlock">
                        <h3 className="faqQuestion">How did you make this website?</h3>
                        <p>- This website was made using the MERN stack (MongoDB, ExpressJS, React, NodeJS). I also use Twitch and Youtube's API to query clips and videos.</p>
                    </Row>
                    <Row className="faqBlock">
                        <h3 className="faqQuestion">Why is the styling so weird for Twitch Clips?</h3>
                        <p>- Due to how Twitch handles their embed clips, there is no way I am able to style or customize Twitch Clips. And since Twitch Clips have the view count of the clip displayed on the top, I had to put a purple bar on top of the clip in order to hide it. This may lead to styling and spacing issues in some unique resolutions. Please DM me if you find any weird styling issues between your devices.</p>
                    </Row>
                    <Row className="faqBlock">
                        <h3 className="faqQuestion">The website gets stuck when I press one of the buttons!</h3>
                        <p>- This is one of random critical bugs that I am currently in progress of debugging and fixing. If you experience this bug, please DM on Twitter @RC98-17 with the Google Console (Control-Shift-[I]).</p>
                    </Row>
                    <Row className="faqBlock">
                        <h3 className="faqQuestion">My Youtube URL does not work!</h3>
                        <p>- Due to how Youtube handles channel names, if the URL contains the subdomain of /c/, it may not be able to be searched by Youtube's API due to their custom naming convention. If you are able to find their channel ID, it will work.</p>
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