import React from 'react'
import CategoryContainer from './CategoryContainer'
import CardContainer from './CardContainer'
import CategoryForm from '../components/CategoryForm'
import { Container } from 'semantic-ui-react'
import CategorySearch from '../components/CategorySearch'

class MainContainer extends React.Component {

    state = {
        categories: [],
        filteredCards: [],
        searchTerm:""
    }

    componentDidMount(){
        fetch('http://localhost:3000/categories')
        .then(response => response.json())
        .then(categories => this.setState({categories: categories}))
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

    filteredCategory = () => this.state.categories.filter(cat => cat.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))

    handleChange = (e) => this.setState({searchTerm: e.target.value})



    render() {
        return (
            <Container>
                <div className="main-container">
                    <CategoryContainer categories={this.state.categories} handleFilterCategory={this.handleFilterCategory}/>
                    <br />
                    <CategoryForm addCategory={this.addCategory} />
                    <br />
                    <CategorySearch searchTerm={this.state.searchTerm} handleChange={this.handleChange}/>
                    <br />
                    <CardContainer filteredCards={this.state.filteredCards} />
                </div>
            </Container>

        )
    }

}

export default MainContainer
