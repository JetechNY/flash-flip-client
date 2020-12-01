import React from 'react'
import { Card } from 'semantic-ui-react'

class FavList extends React.Component{

    state = {
        flipped: true,
        isStarred: false
    }

    clickFlip = () => {
        this.setState({flipped: !this.state.flipped})
    }

    render () {
        return (
            <>
            <p>I MADE IT HERE</p>
            <Card onClick={this.clickFlip} className="card">
                    <h3>{ this.state.flipped ? console.log("card front") :  console.log("card back")}</h3>
            </Card>
            </>
        )
    }
}
export default FavList


// this.props.card.term : this.props.card.definition
