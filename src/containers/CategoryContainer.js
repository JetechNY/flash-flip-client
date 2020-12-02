import React from 'react'
import Category from '../components/Category'
import CategorySearch from '../components/CategorySearch'
import CategoryForm from '../components/CategoryForm'
import { Button } from 'semantic-ui-react'
import FavList from '../components/FavList'

class CategoryContainer extends React.Component{

    renderCategories = () => {
        return this.props.filteredCategories.map(category=> <Category key={category.id} category={category} handleFilterCards={this.props.handleFilterCards} />)
    }



    render () {
        return (
            <div className="category-container">
                <h1>Categories</h1>
                <CategorySearch handleCategorySearchChange={this.props.handleCategorySearchChange}/>
                {this.props.showCategoryForm ? null : <Button onClick={this.props.handleShowCategoryForm}>Add Category</Button>}
                {this.props.showCategoryForm ? <CategoryForm addCategory={this.props.addCategory} handleShowCategoryForm={this.props.handleShowCategoryForm} /> : this.renderCategories()}

                <Button onClick={this.props.handleFavCardList}> {this.props.favList ? "Close Fave Card List":"My Fav Cards"}</Button>
            </div>
        )
    }

}

export default CategoryContainer
