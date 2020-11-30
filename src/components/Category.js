import React from 'react'

class Category extends React.Component{

    localHandleFilterCards = () => {
        this.props.handleFilterCards(this.props.category.cards)
    }

    render(){
        return(
            <div className="category">
                <h2 onClick={this.localHandleFilterCards}>{this.props.category.name}</h2>
            </div>
        )
    }

}

export default Category
