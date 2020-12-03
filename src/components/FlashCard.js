import React from 'react'
import { Card, CardContent } from 'semantic-ui-react'
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
            <div className="flash-card">
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div className ="flip-card-front">
                            <h2>{ this.props.card.term}</h2>
                        </div>
                        <div className ="flip-card-back">
                            <h2>{ this.props.card.definition }</h2>
                        </div>
                    </div>
                </div>
                <div className="flash-card-buttons">
                    <Button onClick={this.handleStarCard}>{this.state.isStarred ? <i className="star icon" />: <i className="star outline icon" />}</Button>
                    {this.props.parentIsGameContainer ? null : <Button id="delete-button" onClick={this.localHandleDeleteCard}><i className="trash icon" /></Button> }
                </div>
            </div>
        )
    }

}

export default FlashCard
