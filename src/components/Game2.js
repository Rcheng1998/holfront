import React from 'react';
import { withRouter, Link } from "react-router-dom"
import {Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios'
import Embed from './Embed'
import CountUp from 'react-countup';
import Reward from 'react-rewards';
import Footer from './Footer';
import Loading from './Loading'
import ReactModal from 'react-modal';


class Game2 extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            name: "",
            apiClipList: [],
            leftClip: [],
            rightClip: [],
            clipsAdded: [],
            gameScore: 0,
            loseState: false,
            isLoading: true,
            hideButton: false,
            showModal: false,
            paraUsername: props.match.params,
            profilepic: "",
            viewButtonToggle: false,
            viewColor: "whiteView",
            modalScore: 0,
            highScore: 0
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
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

    handleOpenModal () {
        let highscore = localStorage.getItem(this.state.paraUsername);
        this.setState({highScore: highscore})
        this.setState({modalScore: this.state.gameScore})
        this.setState({ showModal: true });
      }
      
    handleCloseModal () {
    this.setState({ showModal: false });
    }

    setInitialGame(){
        // set view button toggle and game state
        this.setState({viewButtonToggle: false})
        this.setState({hideButton: false})

        // Set initial two clips and add them to clips added
        this.setState({clipsAdded: []})
        let rand1 = Math.floor(Math.random() * this.state.apiClipList.length);
        let rand2 = Math.floor(Math.random() * this.state.apiClipList.length);
        let addRandList = [rand1, rand2]
        this.setState({clipsAdded:[...this.state.clipsAdded, addRandList]})

        console.log('leftclip', this.state.apiClipList)
        console.log('rightclip', this.state.apiClipList[rand2])

        this.setState({leftClip: this.state.apiClipList[rand1]})
        this.setState({rightClip: this.state.apiClipList[rand2]})

        // Set gamescore to 0

        this.setState({gameScore: 0})
    }

    checkViews(e){
        // Enables button toggle for right clip's view count display
        this.setState({viewColor: 'whiteView'})
        this.setState({viewButtonToggle: true})
        this.setState({hideButton: true})

        // Check button click and compare the view count
            if(e.target.id === 'higher'){
                if(this.state.leftClip.view_count < this.state.rightClip.view_count){
                    console.log('Correct!')
                    setTimeout( () => {
                        this.reward.rewardMe()
                        this.setState({viewColor: 'greenView'})
                        setTimeout( () => {
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
                            this.loseState()
                        }, 2000, [])
                    }, 3000, [])
                }
            }
            else if(e.target.id === 'lower'){
                if(this.state.leftClip.view_count > this.state.rightClip.view_count){
                    console.log('Correct')
                    setTimeout( () => {
                        this.reward.rewardMe()
                        this.setState({viewColor: 'greenView'})
                        setTimeout( () => {
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
                            this.loseState()
                        }, 2000, [])
                    }, 3000, [])
                }
            }
    }

    winState(){
        // +1 counter to gameScore
        this.setState({gameScore: this.state.gameScore + 1})

        // Switches rightClip with leftClip
        this.setState({leftClip: this.state.rightClip})

        let rand2 = Math.floor(Math.random() * this.state.apiClipList.length);

        while( (this.state.clipsAdded).includes(rand2)){
            rand2 = Math.floor(Math.random() * this.state.apiClipList.length);
        }

        let addList = [rand2]
        this.setState({clipsAdded:[...this.state.clipsAdded, addList]})

        this.setState({rightClip: this.state.apiClipList[rand2]})

        this.renderGameState()

        this.setState({viewButtonToggle: false})
        this.setState({hideButton: false})
    }

    loseState(){
        if(this.state.gameScore > localStorage.getItem(this.state.paraUsername)){
            localStorage.setItem(this.state.paraUsername, this.state.gameScore)
        }
        this.handleOpenModal()
        this.setInitialGame()
        this.renderGameState()
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
                <CountUp className='rightViews' start={0} end={this.state.rightClip.view_count} separator={','} duration={2.5}>📈</CountUp>
                </div>
            );
        }
    }

    renderGameState(){
        
        return(
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col md='6'>
                    <Embed embedURL = {this.state.leftClip.embed_url} title = {this.state.leftClip.title}></Embed>
                    <p className="rightViewCount">📈 {this.state.leftClip.view_count ? this.state.leftClip.view_count.toLocaleString('en') : this.state.leftClip.view_count}</p>
                </Col>
                <Col className="centerArrow" md='auto'>
                    <ReactModal isOpen={this.state.showModal} contentLabel="Lose Modal" onRequestClose={this.handleCloseModal} className="Modal" overlayClassName="Overlay" shouldCloseOnOverlayClick={true}>
                        <div className="loseModalText">
                            <h2>You Lose</h2>
                            <p>Highscore: {this.state.highScore}</p>
                            <p>Gamescore: {this.state.modalScore}</p>
                            <Button className="gameButton" onClick={this.handleCloseModal} variant='outline-light'>Play Again</Button>
                            <Link to="/">
                                <Button className="gameButton" variant='outline-light'>Home</Button>
                            </Link>
                        </div>
                    </ReactModal>
                </Col>
                <Col md='6'>
                    <Embed embedURL = {this.state.rightClip.embed_url} title={this.state.rightClip.title}></Embed>
                    <div hidden={this.state.hideButton} className="gameButtons">
                        <Button className="gameButton" variant='outline-light' id="higher" onClick={ e => this.checkViews(e)}><i class="fas fa-arrow-up"></i> Higher</Button>
                        <Button className="gameButton" variant='outline-light' id="lower" onClick={e => this.checkViews(e)}><i class="fas fa-arrow-down"></i> Lower</Button>
                    </div>
                    <Reward ref={(ref) => { this.reward = ref }} type='confetti' config={{springAnimation: false, decay: .975}}>
                        <p className={`rightViewCount ${this.state.viewColor}` }>{this.state.viewButtonToggle ? this.showRightClipView() : this.hideRightClipView()}</p>
                    </Reward>
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
                            <h2 className='twitchFont'>Social HoL</h2>
                            <div className="scoreBoard">
                                <img className="twitchNamePic" alt="" src={this.state.profilepic}></img>
                                <p className="twitchName">{this.state.name}</p>
                            </div>
                            <p className="gameScore">Score: {this.state.gameScore}</p>
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