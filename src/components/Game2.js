import React from 'react';
import { withRouter } from "react-router-dom"
import {Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios'
import Embed from './Embed'
import CountUp from 'react-countup';
import Reward from 'react-rewards';
import Footer from './Footer';
import Loading from './Loading'

class Game2 extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            name: "",
            apiClipList: [],
            leftClip: [],
            rightClip: [],
            gameScore: 0,
            loseState: false,
            isLoading: true,
            paraUsername: props.match.params,
            profilepic: "",
            viewButtonToggle: false,
            viewColor: "whiteView"
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
        this.setState({viewColor: 'whiteView'})
        this.setState({viewButtonToggle: true})

        // Check button click and compare the view count
            if(id === 'higher'){
                if(this.state.leftClip.view_count < this.state.rightClip.view_count){
                    console.log('Correct!')
                    setTimeout( () => {
                        this.reward.rewardMe()
                        this.setState({viewColor: 'greenView'})
                        setTimeout( () => {
                            this.setState({gameScore: this.state.gameScore + 1})
                            this.winState()
                        }, 2000, [])
                    }, 3000, [])
                }
                else{
                    console.log('Wrong! leftclip:', this.state.leftClip.view_count, 'rightclip:', this.state.rightClip.view_count)
                    setTimeout( () => {
                        this.reward.punishMe()
                        this.setState({viewColor: 'redView'})
                        setTimeout( () => {
                            this.setInitialGame()
                            this.renderGameState()
                        }, 2000, [])
                    }, 3000, [])
                }
            }
            else if(id === 'lower'){
                if(this.state.leftClip.view_count > this.state.rightClip.view_count){
                    console.log('Correct')
                    setTimeout( () => {
                        this.reward.rewardMe()
                        this.setState({viewColor: 'greenView'})
                        setTimeout( () => {
                            this.setState({gameScore: this.state.gameScore + 1})
                            this.winState()
                        }, 2000, [])
                    }, 3000, [])
                }
                else{
                    console.log('Wrong! leftclip:', this.state.leftClip.view_count, 'rightclip:', this.state.rightClip.view_count)
                    setTimeout( () => {
                        this.reward.punishMe()
                        this.setState({viewColor: 'redView'})
                        setTimeout( () => {
                            this.setInitialGame()
                            this.renderGameState()
                        }, 2000, [])
                    }, 3000, [])
                }
            }
    }

    winState(){
        // Switches rightClip with leftClip
        this.setState({leftClip: this.state.rightClip})

        let rand2 = Math.floor(Math.random() * this.state.apiClipList.data.length);

        this.setState({rightClip: this.state.apiClipList.data[rand2]})

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
            setTimeout( () => {
            }, 2600)
            return(
                <div>
                <CountUp className='rightViews' start={0} end={this.state.rightClip.view_count} separator={','} duration={2.5}></CountUp>
                </div>
            );
        }
    }

    winCelebration(){

    }

    renderGameState(){
        return(
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col md='5'>
                    <Embed embedURL = {this.state.leftClip.embed_url}></Embed>
                    <p class='clipTitle'>{this.state.leftClip.title}</p>
                    <p className="rightViewCount">📈 {this.state.leftClip.view_count ? this.state.leftClip.view_count.toLocaleString('en') : this.state.leftClip.view_count}</p>
                </Col>
                <Col className="centerArrow" md='auto'>
                <Reward ref={(ref) => { this.reward = ref }} type='confetti'>
                        <Button className="gameButton" variant='outline-light' id="higher" onClick={ e => this.checkViews(e.target.id)}><i class="fas fa-arrow-up"></i> Higher</Button>
                        <br></br>
                        <Button className="gameButton" variant='outline-light' id="lower" onClick={e => this.checkViews(e.target.id)}><i class="fas fa-arrow-down"></i> Lower</Button>
                    </Reward>
                </Col>
                <Col md='5'>
                    <Embed embedURL = {this.state.rightClip.embed_url}></Embed>
                    <p class='clipTitle'>{this.state.rightClip.title}</p>
                    <p className={`rightViewCount ${this.state.viewColor}` }>{this.state.viewButtonToggle ? this.showRightClipView() : this.hideRightClipView()}</p>
                </Col>
            </Row>
        </Container>
        )
    }

    render(){
        if(this.state.isLoading){
            return(
                <Loading></Loading>
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
                            <p class="gameScore">Score: {this.state.gameScore}</p>
                        </Row>
                    </Container>
                    <div className="gameRender">
                        {this.renderGameState()}
                    </div>
                    <Footer></Footer>
                </div>
            )
        }
    }
}

export default withRouter(Game2);