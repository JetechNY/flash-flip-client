import React from 'react'
import Card from '../components/Card'

class CardContainer extends React.Component{

    renderCards = () => {
        return this.props.filteredCards.map(card=> <Card key={card.id} card={card} />)
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
