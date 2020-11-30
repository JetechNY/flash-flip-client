import React from 'react'
import Category from '../components/Category'
import CategorySearch from '../components/CategorySearch'
import CategoryForm from '../components/CategoryForm'

class CategoryContainer extends React.Component{


    renderCategories = () => {
        return this.props.categories.map(category=> <Category key={category.id} category={category} handleFilterCards={this.props.handleFilterCards} />)
    }

    render () {
        return (
            <div className="category-container">
                <h1>Categories</h1>
                <CategorySearch handleCategorySearchChange={this.props.handleCategorySearchChange}/>
                <CategoryForm addCategory={this.props.addCategory} />
                {this.renderCategories()}

            </div>
        )
    }

}

export default CategoryContainer
