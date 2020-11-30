import React from 'react'
import CategoryContainer from './CategoryContainer'
import CardContainer from './CardContainer'
import CategoryForm from '../components/CategoryForm'
import { Container } from 'semantic-ui-react'
import CategorySearch from '../components/CategorySearch'

class MainContainer extends React.Component {

    state = {
        categories: [],
        filteredCategories: [],
        filteredCards: []
    }

    componentDidMount(){
        fetch('http://localhost:3000/categories')
        .then(response => response.json())
        .then(categories => this.setState({
            categories: categories,
            filteredCategories: categories
        }))
        .catch(err => console.log(err))
    }

    addCategory = (categoryObj) => {
        fetch(`http://localhost:3000/categories`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(categoryObj)
            })
            .then(r => r.json())
            .then(data => this.setState({categories: [...this.state.categories, data]}))
      }

    handleFilterCategory = (filteredCards) => {
        this.setState({filteredCards: filteredCards})
    }

    filteredCategory = (searchTerm) => this.state.categories.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))

    handleChange = (e) => {
        debugger
        this.setState({
            filteredCategories: this.state.categories
        });

        this.setState({
            filteredCategories: this.filteredCategory(e.target.value)
        });
    }

    render() {
        return (
            <Container>
                <div className="main-container">
                    <CategoryContainer categories={this.state.filteredCategories} handleFilterCategory={this.handleFilterCategory}/>
                    <br />
                    <CategoryForm addCategory={this.addCategory} />
                    <br />
                    <CategorySearch handleChange={this.handleChange}/>
                    <br />
                    <CardContainer filteredCards={this.state.filteredCards} />
                </div>
            </Container>
        )
    }
}

export default MainContainer
