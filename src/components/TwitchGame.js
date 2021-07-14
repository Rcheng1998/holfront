import React from 'react';
import { withRouter, Link } from "react-router-dom"
import {Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios'
import Embed from './Embed'
import CountUp from 'react-countup';
import Loading from './Loading'
import TwitchPage from './TwitchPage'
import ReactModal from 'react-modal';
import ReactGA from 'react-ga'
import Confetti from 'react-dom-confetti'

class TwitchGame extends React.Component{
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
            highScore: 0,
            alert: false,
            showConfetti: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    async componentDidMount(){
        ReactGA.ga('send', 'pageview', window.location.pathname);
        document.body.style.backgroundColor = '#6441A4'

        const {username} = this.props.match.params;
        this.setState({paraUsername: username})
        
        // calls api for clips of broadcaster
        await axios.get(`${process.env.REACT_APP_TWITCHCHANNELURL}` + username)
        .then(res => {
            const persons = res.data
            this.setState({apiClipList: persons})
            this.setState({isLoading: false})
            console.log('Api Loaded')
            console.log(this.state.apiClipList)
        })
        .catch(err => {
            return(
                this.props.history.push('/twitch/?alert=true')
            )
        });

        // calls api for broadcaster's display name and profile picture
        await axios.get(`${process.env.REACT_APP_TWITCHPROFILEPIC}` + username)
        .then(res => {
            const persons = res.data
            this.setState({profilepic: persons.data[0].profile_image_url})
            this.setState({name: persons.data[0].display_name})
        });

        this.setInitialGame()
    }

    handleOpenModal(showConfetti) {
        let highscore = localStorage.getItem(this.state.paraUsername);
        this.setState({highScore: highscore})
        this.setState({modalScore: this.state.gameScore})
        this.setState({ showModal: true });
        this.setState({showConfetti: showConfetti})

      }
      
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    setInitialGame(){
        // set view button toggle and game state
        this.setState({viewButtonToggle: false})
        this.setState({hideButton: false})
        this.setState({showConfetti: false})

        // Set initial two clips and add them to clips added
        this.setState({clipsAdded: []})
        let rand1 = Math.floor(Math.random() * this.state.apiClipList.length);
        let rand2 = Math.floor(Math.random() * this.state.apiClipList.length);
        if(rand1 === rand2){
            rand2 = Math.floor(Math.random() * this.state.apiClipList.length)
        }
        let addRandList = [rand1, rand2]
        this.setState({clipsAdded:[...this.state.clipsAdded, ...addRandList]})

        this.setState({leftClip: this.state.apiClipList[rand1]})
        this.setState({rightClip: this.state.apiClipList[rand2]})

        // Set gamescore to 0

        this.setState({gameScore: 0})

        console.log('setInitialGame ||', 'clipsAdded:', this.state.clipsAdded, 'leftClip:', this.state.apiClipList[rand1], 'rightClip:', this.state.apiClipList[rand2])
    }

    checkViews(e){
        console.log("in checkviews")
        // Enables button toggle for right clip's view count display
        this.setState({viewColor: 'whiteView'})
        this.setState({viewButtonToggle: true})
        this.setState({hideButton: true})

        let value = e.currentTarget.value

        this.showRightClipView()

        setTimeout( () => {
            console.log("in timeout of check")
            if(value === 'higher'){
                if(this.state.leftClip.view_count <= this.state.rightClip.view_count){
                    this.setState({viewColor: 'greenView'})
                    setTimeout( () => {
                        this.winState()
                    }, 2000, [])
                }
                else{
                    this.setState({viewColor: 'redView'})
                    setTimeout( () => {
                        this.loseState()
                    }, 2000, [])
                }
            }
            else if(value === 'lower'){
                if(this.state.leftClip.view_count <= this.state.rightClip.view_count){
                    this.setState({viewColor: 'redView'})
                    setTimeout( () => {
                        this.loseState()
                    }, 2000, [])
                }
                else{
                    this.setState({viewColor: 'greenView'})
                    setTimeout( () => {
                        this.winState()
                    }, 2000, [])
                }
            }
            else{
                console.log('ERROR???')
                console.log("left", this.state.leftClip, "right",this.state.rightClip, value)
            }
        }, 2000, [])

        // Check button click and compare the view count
        /*
        if(e.target.id === 'higher'){
            if(this.state.leftClip.view_count < this.state.rightClip.view_count){
                console.log('Correct!')
                setTimeout( () => {
                    console.log("changing color")
                    this.setState({viewColor: 'greenView'})
                    setTimeout( () => {
                        console.log("transitioning to winState()")
                        this.winState()
                    }, 2000, [])
                }, 3000, [])
            }
            else{
                console.log('Wrong! leftclip:', this.state.leftClip.view_count, 'rightclip:', this.state.rightClip.view_count)
                setTimeout( () => {
                    console.log("changing color")
                    this.setState({viewColor: 'redView'})
                    setTimeout( () => {
                        console.log("transitioning to loseState()")
                        this.loseState()
                    }, 2000, [])
                }, 3000, [])
            }
        }
        else if(e.target.id === 'lower'){
            if(this.state.leftClip.view_count > this.state.rightClip.view_count){
                console.log('Correct')
                setTimeout( () => {
                    console.log("changing color")
                    this.setState({viewColor: 'greenView'})
                    setTimeout( () => {
                        console.log("transitioning to winState()")
                        this.winState()
                    }, 2000, [])
                }, 3000, [])
            }
            else{
                console.log('Wrong! leftclip:', this.state.leftClip.view_count, 'rightclip:', this.state.rightClip.view_count)
                setTimeout( () => {
                    console.log("changing color")
                    this.setState({viewColor: 'redView'})
                    setTimeout( () => {
                        console.log("transitioning to loseState()")
                        this.loseState()
                    }, 2000, [])
                }, 3000, [])
            }
            
        }*/
    }

    winState(){
        console.log("in win state")
        // +1 counter to gameScore
        this.setState({gameScore: this.state.gameScore + 1})

        // Switches rightClip with leftClip
        this.setState({leftClip: this.state.rightClip})

        let rand2 = Math.floor(Math.random() * this.state.apiClipList.length);

        while( (this.state.clipsAdded).includes(rand2)){
            rand2 = Math.floor(Math.random() * this.state.apiClipList.length);
        }

        let addList = [rand2]
        this.setState({clipsAdded:[...this.state.clipsAdded, ...addList]})

        this.setState({rightClip: this.state.apiClipList[rand2]})

        this.setState({viewButtonToggle: false})
        this.setState({hideButton: false})

        console.log('winState ||', 'clipsAdded:', this.state.clipsAdded, 'rightClip:', this.state.apiClipList[rand2])

        this.renderGameState()
    }

    loseState(){
        console.log("in lose state")
        let showConfetti=false;
        let highscore = localStorage.getItem(this.state.paraUsername)
        if(highscore == null){
            highscore = 0;
            localStorage.setItem(this.state.paraUsername, this.state.gameScore)
        }
        else if(this.state.gameScore > highscore){
            localStorage.setItem(this.state.paraUsername, this.state.gameScore)
            showConfetti=true;
        }

        this.handleOpenModal(showConfetti)
        this.setInitialGame()
        this.setState({viewButtonToggle: false})
        this.renderGameState()
    }

    showRightClipView(){
          const onStart = () => {
            console.log('Started!');
          };
          const onError = error => console.error(error);

          const onEnd = () => {
              console.log("Ended")
          }

        return(
            <div>
                <CountUp className='rightViews' start={0} end={this.state.rightClip.view_count} separator={','} duration={2} onStart={onStart} onEnd={onEnd} onError={onError}></CountUp>
            </div>
        );
    }

    renderGameState(){
        
        return(
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col md='6' lg='6'>
                    <Embed embedURL = {this.state.leftClip.thumbnail_url} title = {this.state.leftClip.title}></Embed>
                    <p className="leftViewCount">📈 {this.state.leftClip.view_count ? this.state.leftClip.view_count.toLocaleString('en') : this.state.leftClip.view_count}</p>
                </Col>
                <Col className="centerArrow" md='auto'>
                    <ReactModal isOpen={this.state.showModal} contentLabel="Lose Modal" onRequestClose={this.handleCloseModal} className="Modal" overlayClassName="Overlay" shouldCloseOnOverlayClick={true} ariaHideApp={false}>
                        <div className="outer">
                            <div className="middle">
                                <div className="innerModal subTitle">
                                    <Container>
                                        <Confetti className="confetti" active={this.state.showConfetti}></Confetti>
                                        <h1>You lost!</h1>
                                        <br></br>
                                        <div className="scoreBoardModal">
                                            <img className="twitchNamePic" alt="" src={this.state.profilepic}></img>
                                            <p className="twitchNameModal">{this.state.name}</p>
                                        </div>
                                        <br></br>
                                        <h4>Highscore - {this.state.highScore}</h4>
                                        <h4>Score - {this.state.modalScore}</h4>
                                        <br></br>
                                        <Button className="gameButton" onClick={this.handleCloseModal} variant='outline-light'>Play Again</Button>
                                        <Link to="/">
                                            <Button className="gameButton" variant='outline-light'>Home</Button>
                                        </Link>
                                        <a href="https://www.buymeacoffee.com/RickC">                                       
                                            <Button className="gameButton" variant='outline-light'>Buy Me ☕</Button>
                                        </a>
                                    </Container>
                                </div>
                            </div>
                        </div>
                    </ReactModal>
                </Col>
                <Col md='6' lg='6'>
                    <Embed embedURL = {this.state.rightClip.thumbnail_url} title={this.state.rightClip.title}></Embed>
                    <div hidden={this.state.hideButton} className="gameButtons">
                        <Button className="gameButton" variant='outline-light' value="higher" onClick={ e => this.checkViews(e)}><i className="fas fa-arrow-up"></i> Higher</Button>
                        <Button className="gameButton" variant='outline-light' value="lower" onClick={e => this.checkViews(e)}><i className="fas fa-arrow-down"></i> Lower</Button>
                    </div>
                    <div className="countUp">
                        <span className={`rightViewCount ${this.state.viewColor}` }>{this.state.viewButtonToggle ? this.showRightClipView() : ""}</span>
                    </div>
                </Col>
            </Row>
        </Container>
        )
    }

    render(){
        if(this.state.alert === true){
            return(
                <TwitchPage></TwitchPage>
            )
        }
        else if(this.state.isLoading){
            return(
                <Loading></Loading>
            )
        }
        else{
            return(
                <div className="gameApp">
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
                        <div className="blockMobile"></div>
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(TwitchGame);