import React from 'react'
import Category from '../components/Category'

class CategoryContainer extends React.Component{


    renderCategories = () => {
        return this.props.categories.map(category=> <Category key={category.id} category={category} handleFilterCategory={this.props.handleFilterCategory} />)
    }

    render () {
        return (
            <div className="category-container">
                <h1>Categories</h1>
                {this.renderCategories()}
            </div>
        )
    }

}

export default CategoryContainer