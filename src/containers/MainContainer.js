import React from 'react'
import CategoryContainer from './CategoryContainer'
import CardContainer from './CardContainer'
import { Container } from 'semantic-ui-react'
import GameContainer from './GameContainer'
import { Button } from 'semantic-ui-react'
import FavList from '../components/FavList'

class MainContainer extends React.Component {

    state = {
        filteredCategory: '',
        filteredCards: [],
        gameState: false,
        categories: [],
        filteredCategories: [],
        showCategoryForm: false,
        favList: false
    }

    fetchCategories = () => {
        fetch(`http://localhost:3000/users/${this.props.user.id}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${this.props.jwt}`}
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                categories: data.user.categories,
                filteredCategories: data.user.categories
            })
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        if (this.props.user.id) this.fetchCategories()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user.id !== this.props.user.id && this.props.user.id) this.fetchCategories()
    }

    addCategory = (categoryObj) => {
        fetch(`http://localhost:3000/categories`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({...categoryObj, user_id: this.props.user.id})
            })
            .then(r => r.json())
            .then(data => this.setState(prevState => {
                return ({
                    categories: [...prevState.categories, data],
                    filteredCategories: [...prevState.filteredCategories, data],
                    showCategoryForm: false,
                    filteredCategory: data,
                    filteredCards: []
                })
            }))
    }


    handleFilterCards = (filteredCategory) => {
        this.setState({
            filteredCategory: filteredCategory,
            filteredCards: filteredCategory.cards,
            favList: false
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

    handleFavCardList =() => {
        this.setState(prevState => {
            return ({
                favList: !prevState.favList,
                filteredCategory: ""
                })
    })
    }

    handleDeleteCard = (cardId) => {
        let newFilteredCards = [...this.state.filteredCards]
        const matchedCardIndex = newFilteredCards.findIndex(card => card.id === cardId)
        newFilteredCards.splice(matchedCardIndex, 1)
        this.setState({filteredCards: newFilteredCards})
    }

    handleDeleteCategory = (categoryId) => {
        fetch(`http://localhost:3000/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${this.props.jwt}`}
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data, "success!")
            let newFilteredCategories = [...this.state.filteredCategories]
            const matchedCatIndex = newFilteredCategories.findIndex(cat => cat.id === categoryId)
            newFilteredCategories.splice(matchedCatIndex, 1)
            this.setState({categories: newFilteredCategories, filteredCategories: newFilteredCategories,filteredCategory: '',filteredCards: [],})
        })
        .catch(err => console.log(err))
    }

    handleCategorySearchChange = (e) => {
        this.setState({
            filteredCategories: this.state.categories
        });

        this.setState({
            filteredCategories: this.filteredCategory(e.target.value)
        });
    }

    filteredCategory = (searchTerm) => this.state.categories.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))

    handleShowCategoryForm =() => {
        this.setState(prevState => {
            return({showCategoryForm: !prevState.showCategoryForm})
        })
    }

    render() {
        return (
            <Container>
                <div className="main-container">
                    {this.state.gameState ?

                    <GameContainer cards={this.state.filteredCards} handleGameState={this.handleGameState}/>
                    :
                    <>
                        <CategoryContainer favList={this.state.favList} handleFavCardList={this.handleFavCardList} handleFilterCards={this.handleFilterCards} categories={this.state.categories} filteredCategories={this.state.filteredCategories} showCategoryForm={this.state.showCategoryForm} filteredCategory={this.filteredCategory} handleCategorySearchChange={this.handleCategorySearchChange} handleShowCategoryForm={this.handleShowCategoryForm} addCategory={this.addCategory}/>
                        {this.state.filteredCategory ? <CardContainer filteredCategory={this.state.filteredCategory} filteredCards={this.state.filteredCards} handleAddCard={this.handleAddCard} handleGameState={this.handleGameState} handleDeleteCard={this.handleDeleteCard} handleDeleteCategory={this.handleDeleteCategory} jwt={this.props.jwt}/> : null}

                        {this.state.favList ? <FavList handleDeleteCard={this.handleDeleteCard} user={this.props.user} jwt={this.props.jwt}/> : null}
                    </>
                    }

                </div>
            </Container>
        )
    }
}

export default MainContainer
