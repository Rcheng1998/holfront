import React from 'react';

class Embed extends React.Component{

    render(){
        return(
            <div class='holder'>
                <div class="bar"></div>
                <iframe class="frame" title="clip" src={this.props.embedURL + "&parent=unruffled-ardinghelli-9ad4d8.netlify.app&parent=www.unruffled-ardinghelli-9ad4d8.netlify.app&parent=netlify.app"} height="420" width="560"></iframe>
            </div>
        )
    }
}

export default Embed