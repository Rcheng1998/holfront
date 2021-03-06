import React from 'react';
import axios from 'axios';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Loading from './Loading'
import EmbedYT from './EmbedYT'
import CountUp from 'react-countup';
import ReactModal from 'react-modal';
import {Link} from 'react-router-dom'
import ReactGA from 'react-ga'
import Confetti from 'react-dom-confetti'

class YoutubeGame extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            youtubeAPIList: [],
            uploadID: "",
            gameList: [],
            clipsAdded: [],
            leftClip: [],
            rightClip: [],
            gameScore: 0,
            channelID: props.match.params,
            paraUsername: "",
            loseState: false,
            isLoading: true,
            hideButton: false,
            showModal: false,
            profilepic: "",
            viewButtonToggle: false,
            viewColor: "whiteView",
            modalScore: 0,
            highScore: 0,
            showConfetti: false
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    async componentDidMount(){
        document.body.style.backgroundColor = "#810000"
        ReactGA.pageview(window.location.pathname + window.location.search);

        let youtubeURL = this.state.channelID;
        const broadcastRes = await axios.get('https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&part=snippet&id=' + youtubeURL.channelId + `&key=${process.env.REACT_APP_YOUTUBEAPIKEY}`,{
            headers: {
                'Accept': 'application/json',
            }
        });

        console.log('broadcast', broadcastRes.data)
        console.log(broadcastRes.data.items[0].snippet.title, broadcastRes.data.items[0].snippet.thumbnails.default.url)
        this.setState({paraUsername: broadcastRes.data.items[0].snippet.title})
        this.setState({profilepic: broadcastRes.data.items[0].snippet.thumbnails.default.url})
        this.setState({uploadID: broadcastRes.data.items[0].contentDetails.relatedPlaylists.uploads})
        console.log(broadcastRes.data.items[0].contentDetails.relatedPlaylists.uploads)

        let nextPageToken
        let nextPageTokenString
        let readyGameList = []
        for(let index = 0; index < 9; index++){
            if(nextPageToken){
                nextPageTokenString = "&pageToken=" + nextPageToken;
            }
            else{
                nextPageTokenString=""
            }

            const videoRes = await axios.get('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=' + this.state.uploadID + nextPageTokenString + `&key=${process.env.REACT_APP_YOUTUBEAPIKEY}` ,{
                headers: {
                    'Accept': 'application/json',
                }
            });

            console.log('videoRes', videoRes.data)

            let videoList = await this.getVideoIDs(videoRes.data.items)
    
            const viewRes = await axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=statistics' + videoList + `&key=${process.env.REACT_APP_YOUTUBEAPIKEY}`,{
                headers: {
                    'Accept': 'application/json',
                }
            });
    
            console.log('viewRes', viewRes.data.items)

            for(let i = 0; i < viewRes.data.items.length; i++){
                readyGameList.push({"id": viewRes.data.items[i].id, "title": videoRes.data.items[i].snippet.title, "viewCount": Number(viewRes.data.items[i].statistics.viewCount)})
            }
    
            if(videoRes.data.nextPageToken){
                nextPageToken = videoRes.data.nextPageToken
            }
        }

        console.log('gameList', readyGameList)
        this.setState({gameList: readyGameList})
        
        this.setInitialGame()

    }

    getVideoIDs(playlist){
        let videoList = ""
        for(let index in playlist){
            videoList+= '&id=' + playlist[index].snippet.resourceId.videoId
        }
        return videoList;
    }

    handleOpenModal(showConfetti) {
        let highscore = localStorage.getItem(this.state.channelID.channelId);
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

        // Set initial two clips and add them to clips added
        this.setState({clipsAdded: []})
        let rand1 = Math.floor(Math.random() * this.state.gameList.length);
        let rand2 = Math.floor(Math.random() * this.state.gameList.length);
        if(rand1 === rand2){
            rand2 = Math.floor(Math.random() * this.state.gameList.length)
        }
        let addRandList = [rand1, rand2]
        this.setState({clipsAdded:[...this.state.clipsAdded, ...addRandList]})

        this.setState({leftClip: this.state.gameList[rand1]})
        this.setState({rightClip: this.state.gameList[rand2]})

        // Set gamescore to 0

        this.setState({gameScore: 0})

        this.setState({isLoading: false})

        console.log('setInitialGame ||', 'clipsAdded:', this.state.clipsAdded, 'leftClip:', this.state.gameList[rand1], 'rightClip:', this.state.gameList[rand2])
    }

    checkViews(e){
        // Enables button toggle for right clip's view count display
        this.setState({viewColor: 'whiteView'})
        this.setState({viewButtonToggle: true})
        this.setState({hideButton: true})

        let value = e.currentTarget.value

        this.showRightClipView()

        setTimeout( () => {
            console.log("in timeout of check")
            if(value === 'higher'){
                if(this.state.leftClip.viewCount <= this.state.rightClip.viewCount){
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
                if(this.state.leftClip.viewCount <= this.state.rightClip.viewCount){
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
    }

    winState(){
        // +1 counter to gameScore
        this.setState({gameScore: this.state.gameScore + 1})

        // Switches rightClip with leftClip
        this.setState({leftClip: this.state.rightClip})

        let rand2 = Math.floor(Math.random() * this.state.gameList.length);

        while( (this.state.clipsAdded).includes(rand2)){
            rand2 = Math.floor(Math.random() * this.state.gameList.length);
        }

        let addList = [rand2]
        this.setState({clipsAdded:[...this.state.clipsAdded, ...addList]})

        this.setState({rightClip: this.state.gameList[rand2]})

        this.setState({viewButtonToggle: false})
        this.setState({hideButton: false})
        this.renderGameState()

        console.log('winState ||', 'clipsAdded:', this.state.clipsAdded, 'rightClip:', this.state.gameList[rand2])
    }

    loseState(){
        let showConfetti= false;
        let highscore = localStorage.getItem(this.state.channelID.channelId)
        if(highscore == null){
            highscore = 0;
        }
        if(this.state.gameScore > highscore){
            localStorage.setItem(this.state.channelID.channelId, this.state.gameScore)
            showConfetti = true;
        }
        this.handleOpenModal(showConfetti)
        this.setInitialGame()
        this.setState({viewButtonToggle: false})
        this.renderGameState()
    }

    showRightClipView(){
        const onComplete = () => {
            console.log('Completed!');
          };
          
          const onStart = () => {
            console.log('Started!');
          };

          const onError = error => console.error(error);

        return(
            <div>
                <CountUp className='rightViews' start={0} end={this.state.rightClip.viewCount} separator={','} duration={2} onComplete={onComplete} onStart={onStart} onError={onError}></CountUp>
            </div>
        );
    }


    renderGameState(){
        
        return(
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col md='6' lg='6'>
                    <EmbedYT id = {this.state.leftClip.id} title = {this.state.leftClip.title}></EmbedYT>
                    <p className="leftViewCount">???? {this.state.leftClip.viewCount ? this.state.leftClip.viewCount.toLocaleString('en') : this.state.leftClip.viewCount}</p>
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
                                            <p className="twitchNameModal">{this.state.paraUsername}</p>
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
                                            <Button className="gameButton" variant='outline-light'>Buy Me ???</Button>
                                        </a>
                                    </Container>
                                </div>
                            </div>
                        </div>
                    </ReactModal>
                </Col>
                <Col md='6' lg='6'>
                    <EmbedYT id = {this.state.rightClip.id} title={this.state.rightClip.title}></EmbedYT>
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
        if(this.state.isLoading){
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
                                <p className="twitchName">{this.state.paraUsername}</p>
                            </div>
                            <p className="gameScore">Score: {this.state.gameScore}</p>
                        </Row>
                    </Container>
                    <div className="gameRender">
                        {this.renderGameState()}
                    </div>
                    <div className="blockMobile"></div>
                </div>
            )
        }
    }
}

export default YoutubeGame