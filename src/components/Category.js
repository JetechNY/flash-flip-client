import React from 'react'
import CardContainer from '../containers/CardContainer'

class Category extends React.Component{

    localHandleFilterCategory = () => {
        this.props.handleFilterCategory(this.props.category.cards)
    }

    render(){
        return(
            <div className="category">
                <h2 onClick={this.localHandleFilterCategory}>{this.props.category.name}</h2>
            </div>
        )
    }

}

export default Category