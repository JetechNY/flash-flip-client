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
                <div className="category-container-top">
                    <h1 className="ccc">Categories</h1>
                    {this.props.showCategoryForm ? null : <CategorySearch handleCategorySearchChange={this.props.handleCategorySearchChange}/>}
                    <div className="category-container-top-buttons">
                        {this.props.showCategoryForm ? null : <Button onClick={this.props.handleShowCategoryForm}><i className="add icon" />Add Category</Button>}
                        {this.props.showCategoryForm ? null : <Button onClick={this.props.handleFavCardList}> {this.props.favList ? <><i className="star icon" />Close</>:<><i className="star icon" /> Cards</>}</Button>}
                    </div>
                </div>
                <div className="category-container-bottom">
                    {this.props.showCategoryForm ? <CategoryForm addCategory={this.props.addCategory} handleShowCategoryForm={this.props.handleShowCategoryForm} /> : this.renderCategories()}
                </div>
            </div>
        )
    }

}

export default CategoryContainer
