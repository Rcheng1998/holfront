import React from 'react';

class Embed extends React.Component{

    render(){
        return(
            <div class='holder'>
                <div class="bar"></div>
                <iframe class="frame" title="clip" src={this.props.embedURL + "&parent=socialhol.netlify.app&parent=www.socialhol.netlify.app&parent=netlify.app"} height="100%" width="100%"></iframe>
            </div>
        )
    }
}

export default Embed