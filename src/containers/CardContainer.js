import React from 'react'
import Card from '../components/Card'

class CardContainer extends React.Component{

    state ={
        cards: []
    }

    componentDidMount(){
        fetch('http://localhost:3000/categories')
        .then(response => response.json())
        .then(cards => this.setState({cards: cards}))
        .catch(err => console.log(err))
    }

    renderCard = () => {
        return this.state.cards.map(card=> <Card card={card} key={card.id}/>)
    }

    //DeleteContainer
    // deleteCard = () => {
    //     console.log(this.props.card)
    //     fetch(`http://localhost:3000/categories/${this.props.card.id}`, {method:"DELETE"})
    // }


    render () {
        console.log(this.state)
        return (
            <>
            <h1>    Hello </h1>
            {this.renderCard()}
            </>
        )
    }


}

export default CardContainer
