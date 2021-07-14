import React from 'react';

class Embed extends React.Component{
    render(){
        console.log('embed url', this.props.embedURL)
        if(this.props.embedURL == null){
            return(null);
        }
        else{
            console.log('embed url ELSE', this.props.embedURL.split('-preview')[0])
            return(
                <div>
                        <p className="clipTitle"> "{this.props.title}" </p>
                        <hr className="titleHR"></hr>
                        <video className="twitchFrame" title="clip" src={this.props.embedURL.split('-preview-')[0] + ".mp4"} height="100%" width="100%" controls={true} poster={this.props.embedURL}></video>
                </div>
            )
        }
    }
}

export default Embed;