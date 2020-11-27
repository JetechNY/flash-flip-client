import React from 'react'

class Card extends React.Component{

    render(){
        return(
            <div className="card">
                <h2>{this.props.card.term}</h2>
            </div>
        )
    }

}

export default Card
