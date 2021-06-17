import React from 'react'
import ReactLoading from 'react-loading'

class Loading extends React.Component{
    render(){
        return(
            <div class="loading">
                <h1>Loading game...</h1>
                <ReactLoading class="spinning" type="spinningBubbles" color="white" height={'50%'} width={'50%'}></ReactLoading>
            </div>
        );
    }
}

export default Loading;