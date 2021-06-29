import React from 'react';

class Embed extends React.Component{

    render(){
        return(
            <div className='holder fadeIn'>
                <div className="bar">
                    <p className="clipTitle"> "{this.props.title}" </p>
                    <hr className="titleHR"></hr>
                </div>
                <iframe className="frame" title="clip" src={this.props.embedURL + "&parent=socialhol.com&parent=www.socialhol.com&parent=socialhol.netlify.app&parent=www.socialhol.netlify.app&parent=netlify.app"} height="100%" width="100%" allowFullScreen={false}></iframe>
            </div>
        )
    }
}

export default Embed