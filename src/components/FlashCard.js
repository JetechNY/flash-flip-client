import React from 'react'
import { Card } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

class FlashCard extends React.Component{

    state = {
        flipped: true,
        isStarred: false
    }

    componentDidMount() {
        this.setState({isStarred: this.props.card.is_starred})
    }

    clickFlip = () => {
        this.setState({flipped: !this.state.flipped})
    }

    handleStarCard = () => {

        fetch(`http://localhost:3000/cards/${this.props.card.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${this.props.jwt}`
                },
                body: JSON.stringify({...this.props.card, is_starred: !this.state.isStarred})
            })
            .then(resp => resp.json())
            .then(card => {this.setState({isStarred: card.is_starred})})
            .catch(err => console.log(err))

    }

    localHandleDeleteCard = () => {
        fetch(`http://localhost:3000/cards/${this.props.card.id}`, {
            method:'DELETE',
            headers: {Authorization: `Bearer ${this.props.jwt}`}
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("successfully deleted!", data)
            this.props.handleDeleteCard(this.props.card.id)
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <>
                <Card onClick={this.clickFlip} className="card">
                    <h3>{ this.state.flipped ? this.props.card.term : this.props.card.definition }</h3>
                </Card>
                <Button onClick={this.handleStarCard}>{this.state.isStarred ? "Unstar Card": "Star Card"}</Button>
                {this.props.parentIsGameContainer ? null : <Button onClick={this.localHandleDeleteCard}>Delete Card</Button> }
            </>
        )
    }

}

export default FlashCard
