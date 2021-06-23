import ReactModal from 'react-modal'
import React from 'react'

class LoseModal extends React.Component{
    componentDidUpdate(prevProps){
        if(prevProps.gameScore || this.props.gameScore){
            console.log(this.props.gameScore)
        }
    }

    render(){
        return(
            <div key={this.props.gameScore}>
                <ReactModal isOpen={this.props.showModal} contentLabel="Lose Modal" onRequestClose={this.handleCloseModal} className="Modal" overlayClassName="Overlay" shouldCloseOnOverlayClick={true}>
                    <h1>In modal</h1>
                    <p>{this.props.name}</p>
                    <p>Highscore: </p>
                    <p>Game Score: {this.props.gameScore}</p>
                </ReactModal>
            </div>
        )
    }
}

export default LoseModal;