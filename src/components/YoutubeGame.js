import React from 'react';
import axios from 'axios';
import {Container, Row } from 'react-bootstrap';
import Footer from './Footer'
import Loading from './Loading'

class YoutubeGame extends React.Component{
    state = {
        youtubeAPIList: [],
        uploadID: "",
        gameList: [],
        clipsAdded: [],
        leftClip: [],
        rightClip: [],
        gameScore: 0,
        isLoading: true
    }

    async componentDidMount(){
        let youtubeURL = 'UCmDTrq0LNgPodDOFZiSbsww'
        const broadcastRes = await axios.get('https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&id=' + youtubeURL + '&key=AIzaSyA8fghL1wGnRSZWJG37YpBfSqCLK1_mYzs',{
            headers: {
                'Accept': 'application/json',
            }
        });

        this.setState({uploadID: broadcastRes.data.items[0].contentDetails.relatedPlaylists.uploads})
        console.log(broadcastRes.data.items[0].contentDetails.relatedPlaylists.uploads)

        let nextPageToken
        let nextPageTokenString
        let readyGameList = []
        for(let index = 0; index < 3; index++){
            if(nextPageToken){
                nextPageTokenString = "&pageToken=" + nextPageToken;
            }
            else{
                nextPageTokenString=""
            }

            const videoRes = await axios.get('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=' + this.state.uploadID + nextPageTokenString + '&key=AIzaSyA8fghL1wGnRSZWJG37YpBfSqCLK1_mYzs' ,{
                headers: {
                    'Accept': 'application/json',
                }
            });

            console.log('videoRes', videoRes.data)

            let videoList = await this.getVideoIDs(videoRes.data.items)
    
            const viewRes = await axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=statistics' + videoList + '&key=AIzaSyA8fghL1wGnRSZWJG37YpBfSqCLK1_mYzs',{
                headers: {
                    'Accept': 'application/json',
                }
            });
    
            console.log('viewRes', viewRes.data.items)

            for(let i = 0; i < viewRes.data.items.length; i++){
                readyGameList.push({"id": viewRes.data.items[i].id, "title": videoRes.data.items[i].snippet.title, "viewCount": viewRes.data.items[i].statistics.viewCount})
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

    setInitialGame(){
        // Set initial two clips and add them to clips added
        this.setState({clipsAdded: []})
        let rand1 = Math.floor(Math.random() * this.state.gameList.length);
        let rand2 = Math.floor(Math.random() * this.state.gameList.length);
        let addRandList = [rand1, rand2]
        this.setState({clipsAdded:[...this.state.clipsAdded, addRandList]})

        this.setState({leftClip: this.state.gameList[rand1]})
        this.setState({rightClip: this.state.gameList[rand2]})

        // Set gamescore to 0

        this.setState({gameScore: 0})

        this.setState({isLoading: false})
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
                       <p>{this.state.leftClip.title}</p>
                       <p>{this.state.leftClip.id}</p>
                       <p>{this.state.leftClip.viewCount}</p>
                        <br></br>
                       <p>{this.state.rightClip.title}</p>
                       <p>{this.state.rightClip.id}</p>
                       <p>{this.state.rightClip.viewCount}</p>
                    </div>
                    <Footer></Footer>
                </div>
            )
        }
    }
}

export default YoutubeGame