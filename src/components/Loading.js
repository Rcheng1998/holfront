import React from 'react'
import ReactLoading from 'react-loading'
import { Alert } from 'react-bootstrap'

class Loading extends React.Component{
    render(){
        return(
            <div className="gameApp">
                <div className="loading">
                    <h1>Loading game...</h1>
                    <ReactLoading className="spinning" type="spinningBubbles" color="white" height={'50%'} width={'50%'}></ReactLoading>
                    <Alert className="alertLoading" variant="primary">
                        Game may take up to 10 seconds to load due to Twitch's API...
                    </Alert>
                </div>
            </div>
        );
    }
}

export default Loading;