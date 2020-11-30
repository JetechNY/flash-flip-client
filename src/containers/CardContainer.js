import React from 'react'
import FlashCard from '../components/FlashCard'
import CardForm from '../components/CardForm'
import CardSearch from '../components/CardSearch'
import { Button } from 'semantic-ui-react'

class CardContainer extends React.Component{

    state = {
        showCardForm: false,
        searchTerm: ''
    }

    renderCards = () => {
        return this.filterCardsFromSearch().map(card=> <FlashCard key={card.id} card={card} handleDeleteCard={this.props.handleDeleteCard} />)
    }

    handleShowCardForm = () => {
        this.setState(prevState => {
            return ({showCardForm: !prevState.showCardForm})
        })
    }

    filterCardsFromSearch = () => {
        return this.props.filteredCards.filter(card => card.term.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || card.definition.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }

    handleCardSearchChange = (searchTerm) => {
        this.setState({searchTerm: searchTerm})
    }

    render () {
        return (
            <div className="card-container">
                <h1>{this.props.filteredCategory.name} Flash Cards</h1>
                <Button onClick={this.handleShowCardForm}>{this.state.showCardForm ? "Cancel" : "Add Flash Card"}</Button>
                {this.state.showCardForm ? 
                <CardForm filteredCategoryId={this.props.filteredCategory.id} handleAddCard={this.props.handleAddCard} handleShowCardForm={this.handleShowCardForm}/> 
                : 
                <>
                    <CardSearch searchTerm={this.state.searchTerm} handleCardSearchChange={this.handleCardSearchChange} />
                    <Button onClick={this.props.handleGameState} >Study</Button>    
                    {this.renderCards()}
                </>
                }
            </div>
        )
    }

}

export default CardContainer
