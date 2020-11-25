import React from 'react'

class Card extends React.Component{

    render(){
        return(

            <h1 >  {this.props.card.name}  </h1>
        )
    }

}

export default Card
