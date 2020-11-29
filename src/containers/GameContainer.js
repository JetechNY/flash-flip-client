import React from 'react'
import Card from '../components/Card'

class GameContainer extends React.Component {

    state = {
        currentCard: '',
        shuffledCards: [],
        rightCounter: 0,
        wrongCounter: 0,
        skippedCounter: 0
    }

    componentDidMount() {
        let shuffledCards = this.shuffleCards(this.props.cards)
        this.setState({currentCard: shuffledCards[0], shuffledCards: shuffledCards})
    }

    shuffleCards = (cards) => {

        let currentIndex = cards.length, temporaryValue, randomIndex;
        
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = cards[currentIndex];
          cards[currentIndex] = cards[randomIndex];
          cards[randomIndex] = temporaryValue;
        }
        
        return cards;
    }



    handleStarCard = () => {
        
        let starMatrix = {
            true: false,
            false: true
        }

        fetch(`http://localhost:3000/cards/${this.state.currentCard.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({...this.state.currentCard, is_starred: starMatrix[this.state.currentCard.is_starred]})
            })
            .then(resp => resp.json())
            .then(card => this.setState({currentCard: card}))
            .catch(err => console.log(err))

    } 

    render() {
        return (
            <section className="game-container">
                <section className="game-container-left-section">
                    <div className="timer">
                        timer: 00:00sec
                    </div>
                    <div className="game-stats">
                        <p>right: {this.state.rightCounter}</p>
                        <p>wrong: {this.state.wrongCounter}</p>
                        <p>skipped: {this.state.skippedCounter}</p>
                    </div>
                    <button className="star-card-button" onClick={this.handleStarCard}>{this.state.currentCard.is_starred ? "Unstar Card": "Star Card"}</button>
                </section>
                <section className="game-container-right-section">
                    <div className="game-container-card-holder">
                        <Card key={this.state.currentCard.id} card={this.state.currentCard} />
                    </div>
                    <div className="game-buttons">
                        <button className="right-button">RIGHT</button>
                        <button className="wrong-button">WRONG</button>
                        <button className="skip-button">SKIP</button>
                    </div>
                </section>
            </section>
        )
    }

}

export default GameContainer