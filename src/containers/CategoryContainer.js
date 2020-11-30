import React from 'react'
import Category from '../components/Category'
import CategorySearch from '../components/CategorySearch'
import CategoryForm from '../components/CategoryForm'
import { Button } from 'semantic-ui-react'

class CategoryContainer extends React.Component{

    state = {
        categories: [],
        filteredCategories: [],
        showForm: false
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
            .then(data => this.setState({
                categories: [...this.state.categories, data],
                filteredCategories: [...this.state.categories, data],
                showForm: false
            }))
      }


    handleCategorySearchChange = (e) => {
        console.log(e.target.value)
        this.setState({
            filteredCategories: this.state.categories
        });

        this.setState({
            filteredCategories: this.filteredCategory(e.target.value)
        });
    }

    filteredCategory = (searchTerm) => this.state.categories.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))

    renderCategories = () => {
        return this.state.filteredCategories.map(category=> <Category key={category.id} category={category} handleFilterCards={this.props.handleFilterCards} />)
    }

    showCategoryForm =() => {
        this.setState(prevState => {
            return({showForm: !prevState.showForm})
        })
    }

    render () {
        return (
            <div className="category-container">
                <h1>Categories</h1>
                <CategorySearch handleCategorySearchChange={this.handleCategorySearchChange}/>
                {this.state.showForm ? null : <Button onClick={this.showCategoryForm} id="add-category-button">Add Category</Button>}
                {this.state.showForm ? <CategoryForm addCategory={this.addCategory} showCategoryForm={this.showCategoryForm} /> : this.renderCategories()}

            </div>
        )
    }

}

export default CategoryContainer
