import React from 'react'
import FlashCard from '../components/FlashCard'
import GameContainer from './GameContainer'

class CardContainer extends React.Component{

    renderCards = () => {
        return this.props.filteredCards.map(card=> <FlashCard key={card.id} card={card} />)
    }

    render () {
        return (
            <div className="card-container">
                <h1>Card Container</h1>
                {this.renderCards()}
            </div>
        )
    }

}

export default CardContainer
