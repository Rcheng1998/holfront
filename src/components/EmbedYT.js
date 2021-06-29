import React from 'react';

class EmbedYT extends React.Component{

    render(){
        return(
            <div>
                <p>" {this.props.title} "</p>
                <hr className="titleHR"></hr>
                <iframe className="ytFrame" title="clip" src={"https://www.youtube.com/embed/" + this.props.id} height="100%" width="100%"></iframe>
            </div>
        )
    }
}

export default EmbedYT