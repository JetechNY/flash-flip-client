import React from 'react'
import FlashCard from '../components/FlashCard'
import CardForm from '../components/CardForm'
import CardSearch from '../components/CardSearch'
import { Button } from 'semantic-ui-react'

class CardContainer extends React.Component{

    state = {
        showCardForm: false,
        searchTerm: '',
        cards: []
    }

    fetchCards = () => {
        fetch(`http://localhost:3000/categories/${this.props.filteredCategory.id}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${this.props.jwt}`}
        })
        .then(resp => resp.json())
        .then(category => {
            this.setState({cards: category.cards})
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filteredCategory.id !== this.props.filteredCategory.id && this.props.filteredCategory.id) this.fetchCards()
    }

    componentDidMount() {
        this.fetchCards()
    }

    handleAddCardsCardContainer = (newCard) => {
        this.props.handleAddCard(newCard)
        this.fetchCards()
    }

    handleDeleteCardsCardContainer = (newCard) => {
        this.props.handleDeleteCard(newCard)
        this.fetchCards()
    }

    renderCards = () => {
        return this.filterCardsFromSearch().map(card=> <FlashCard key={card.id} card={card} handleDeleteCard={this.handleDeleteCardsCardContainer} jwt={this.props.jwt} />)
    }

    handleShowCardForm = () => {
        this.setState(prevState => {
            return ({showCardForm: !prevState.showCardForm})
        })
    }

    filterCardsFromSearch = () => {
        return this.state.cards.filter(card => card.term.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || card.definition.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }

    handleCardSearchChange = (searchTerm) => {
        this.setState({searchTerm: searchTerm})
    }

    localHandleDeleteCategory = () => {
        this.props.handleDeleteCategory(this.props.filteredCategory.id)
    }

    render () {
        return (
            <div className="card-container">
                <div className="card-container-top">
                    <div className="card-container-top-top">
                        <h1 className="cctt">{this.props.filteredCategory.name} Flash Cards</h1>
                        {this.state.showCardForm ? null : <Button id="delete-button" onClick={this.localHandleDeleteCategory}><i className="trash icon" />Delete Category</Button>}
                    </div>
                    <div className="card-container-top-center">
                        {this.state.showCardForm ? null : <CardSearch searchTerm={this.state.searchTerm} handleCardSearchChange={this.handleCardSearchChange} />}
                    </div>
                    <div className="card-container-top-bottom">
                        <Button onClick={this.handleShowCardForm}>{this.state.showCardForm ? "Cancel" : <><i className="add icon" />Add Flash Card</>}</Button>
                        {this.state.showCardForm ? null : <Button onClick={this.props.handleGameState}> <><i className="pencil alternate icon" /> Start Study Session</></Button>}
                    </div>
                </div>
                <div className="card-container-bottom">
                    {this.state.showCardForm ?
                    <CardForm filteredCategoryId={this.props.filteredCategory.id} handleAddCard={this.handleAddCardsCardContainer} handleShowCardForm={this.handleShowCardForm}/>
                    :
                    this.state.cards ? this.renderCards() : <i class="sync icon"></i>}
                </div>
            </div>
        )
    }

}

export default CardContainer
