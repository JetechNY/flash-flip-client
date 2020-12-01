import React from 'react'
import { NavLink } from 'react-router-dom'

class Category extends React.Component{

    localHandleFilterCards = () => {
        this.props.handleFilterCards(this.props.category)
    }

    render(){
        return(
            <div className="category">
                <NavLink onClick={this.localHandleFilterCards} to={"/categories/"+this.props.category.name.toLowerCase().replace(" ", "-")}>{this.props.category.name}</NavLink>
            </div>
        )
    }

}

export default Category
