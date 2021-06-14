import React from 'react';

class Embed extends React.Component{

    render(){
        return(
            <div>
                <iframe title="clip" src={this.props.embedURL + "&parent=unruffled-ardinghelli-9ad4d8.netlify.app&parent=www.unruffled-ardinghelli-9ad4d8.netlify.app&parent=netlify.app"} height="360" width="360"></iframe>
            </div>
        )
    }
}

export default Embed