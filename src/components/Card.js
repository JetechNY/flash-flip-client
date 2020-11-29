import React from 'react'

class Card extends React.Component{


    state = {
        flipped: true
    }

    clickFlip = () => {
        this.setState({flipped: !this.state.flipped})
    }

    render(){
        return(
            <div onClick={this.clickFlip} className="card">
                <h3>{ this.state.flipped ? this.props.card.term : this.props.card.definition }</h3>
            </div>
        )
    }

}

export default Card
