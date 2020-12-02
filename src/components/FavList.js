import React from 'react'
import FlashCard from './FlashCard'

class FavList extends React.Component{

    state ={
        favCards: []
    }

    handleDeleteCardInFavList = (cardId) => {
        this.props.handleDeleteCard(cardId)
        let newFavCards = [...this.state.favCards]
        const matchedIndex = newFavCards.findIndex(card => card.id ===cardId)
        newFavCards.splice(matchedIndex,1)
        this.setState({favCards: newFavCards})
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.user.id}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${this.props.jwt}`}
        })
        .then(resp => resp.json())
        .then(data => {
            const favCards = []
            data.user.categories.forEach(category => {
                category.cards.map(card => {
                    if (card.is_starred) favCards.push(card)
                })
            });
            this.setState({favCards: favCards})
        })
        .catch(err => console.log(err))
    }

    renderCards =() => {
        return(
            this.state.favCards.map(card => <FlashCard handleDeleteCard={this.handleDeleteCardInFavList} jwt={this.props.jwt} key={card.id} card={card} parentIsFavList={true} /> )
        )
    }

    render () {
        return (
            <div className="fav-list-container">
                {this.renderCards()}
            </div>
        )
    }
}
export default FavList


