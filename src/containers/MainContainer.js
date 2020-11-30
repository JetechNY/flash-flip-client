import React from 'react'
import CategoryContainer from './CategoryContainer'
import CardContainer from './CardContainer'
import { Container } from 'semantic-ui-react'
import GameContainer from './GameContainer'

class MainContainer extends React.Component {

    state = {
        filteredCategory: '',
        filteredCards: []
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

    render() {
        return (
            <Container>
                <div className="main-container">
                    <CategoryContainer handleFilterCards={this.handleFilterCards}/>
                    {this.state.filteredCategory ? <CardContainer filteredCategory={this.state.filteredCategory} filteredCards={this.state.filteredCards} handleAddCard={this.handleAddCard}/> : null}
                    {/* {this.state.filteredCards.length > 0 ? <GameContainer cards={this.state.filteredCards}/>: null} */}
                </div>
            </Container>
        )
    }
}

export default MainContainer
