import React from 'react'
import CategoryContainer from './CategoryContainer'
import CardContainer from './CardContainer'

class MainContainer extends React.Component {

    state = {
        categories: [],
        filteredCards: []
    }

    componentDidMount(){
        fetch('http://localhost:3000/categories')
        .then(response => response.json())
        .then(categories => this.setState({categories: categories}))
        .catch(err => console.log(err))
    }

    handleFilterCategory = (filteredCards) => {
        this.setState({filteredCards: filteredCards})
    }

    render() {
        return (
            <div className="main-container">
                <CategoryContainer categories={this.state.categories} handleFilterCategory={this.handleFilterCategory}/>
                {this.state.filteredCards.length > 0 ? <CardContainer filteredCards={this.state.filteredCards} /> : null}
            </div>
        )
    }

}

export default MainContainer