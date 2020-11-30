import React from 'react'
import { Card } from 'semantic-ui-react'

class FlashCard extends React.Component{

    state = {
        flipped: true
    }

    clickFlip = () => {
        this.setState({flipped: !this.state.flipped})
    }

    render(){
        return(
            <Card onClick={this.clickFlip} className="card">
                <h3>{ this.state.flipped ? this.props.card.term : this.props.card.definition }</h3>
            </Card>
        )
    }

}

export default FlashCard
