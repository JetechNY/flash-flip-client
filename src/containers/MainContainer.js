import React from 'react'
import CategoryContainer from './CategoryContainer'
import CardContainer from './CardContainer'
import { Container } from 'semantic-ui-react'
import GameContainer from './GameContainer'

class MainContainer extends React.Component {

    state = {
        filteredCategory: '',
        filteredCards: [],
        gameState: false
    }


    handleFilterCards = (filteredCategory) => {
        this.setState({
            filteredCategory: filteredCategory,
            filteredCards: filteredCategory.cards
        })
    }

    handleAddCard = (newCard) => {
        this.setState(prevState => {
            return ({filteredCards: [...prevState.filteredCards, newCard]})
        })
    }

    handleGameState = () => {
        this.setState(prevState => {
            return ({gameState: !prevState.gameState}) 
        })
    }

    handleDeleteCard = (cardId) => {
        let newFilteredCards = [...this.state.filteredCards]
        const matchedCardIndex = newFilteredCards.findIndex(card => card.id === cardId)
        newFilteredCards.splice(matchedCardIndex, 1)
        this.setState({filteredCards: newFilteredCards})
    }

    render() {
        return (
            <Container>
                <div className="main-container">
                    {this.state.gameState ? 
                    <GameContainer cards={this.state.filteredCards} handleGameState={this.handleGameState}/>
                    :
                    <>
                        <CategoryContainer handleFilterCards={this.handleFilterCards}/>
                        {this.state.filteredCategory ? <CardContainer filteredCategory={this.state.filteredCategory} filteredCards={this.state.filteredCards} handleAddCard={this.handleAddCard} handleGameState={this.handleGameState} handleDeleteCard={this.handleDeleteCard}/> : null}
                    </>
                    }
                </div>
            </Container>
        )
    }
}

export default MainContainer
