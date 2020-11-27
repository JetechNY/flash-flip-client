import React from 'react'
import Card from '../components/Card'
import GameContainer from './GameContainer'

class CardContainer extends React.Component{

    renderCards = () => {
        return this.props.filteredCards.map(card=> <Card key={card.id} card={card} />)
    }

    render () {
        return (
            <div className="card-container">
                <h1>Card Container</h1>
                {this.renderCards()}
                <GameContainer cards={this.props.filteredCards}/>
            </div>
        )
    }

}

export default CardContainer
