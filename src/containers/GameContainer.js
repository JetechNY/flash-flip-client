import React from 'react'
import Card from '../components/FlashCard'

class GameContainer extends React.Component {

    state = {
        currentCardIndex: 0,
        shuffledCards: [],
        rightCounter: 0,
        wrongCounter: 0,
        skippedCounter: 0,
        completedCards: []
    }

    componentDidMount() {
        let shuffledCards = this.shuffleCards(this.props.cards)
        this.setState({shuffledCards: shuffledCards})
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

    findIndex = (currentCard) => {
        let index = this.state.shuffledCards.findIndex(card => card.id === currentCard.id)
        return index
    }

    handleStarCard = () => {
        
        let starMatrix = {
            true: false,
            false: true
        }

        fetch(`http://localhost:3000/cards/${this.state.shuffledCards[this.state.currentCardIndex].id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({...this.state.currentCard, is_starred: starMatrix[this.state.currentCard.is_starred]})
            })
            .then(resp => resp.json())
            .then(card => {
                let index = this.findIndex(card)
                if (index > -1) {
                    const newShuffledCards = this.state.shuffledCards
                    newShuffledCards[index] = card
                    this.setState({shuffleCards: newShuffledCards})
                }
            })
            .catch(err => console.log(err))

    } 

    handleRight = () => {
        const currentCard = this.state.shuffledCards[this.state.currentCardIndex]
        this.setState(prevState => {
            return ({
                rightCounter: prevState.rightCounter += 1,
                currentCardIndex: prevState.currentCardIndex += 1,
                completedCards: [...prevState.completedCards, {...currentCard, right: true}]
            })
        })
    }

    handleWrong = () => {
        const currentCard = this.state.shuffledCards[this.state.currentCardIndex]
        this.setState(prevState => {
            return ({
                wrongCounter: prevState.wrongCounter += 1,
                currentCardIndex: prevState.currentCardIndex += 1,
                completedCards: [...prevState.completedCards, {...currentCard, right: false}]
            })
        })
    }

    handleSkipped = () => {
        const currentCard = this.state.shuffledCards[this.state.currentCardIndex]
        this.setState(prevState => {
            return ({
                skippedCounter: prevState.skippedCounter += 1,
                currentCardIndex: prevState.currentCardIndex += 1,
                shuffledCards: [...prevState.shuffledCards, currentCard]
            })
        })
    }

    reviewGame = () => {
        return this.state.completedCards.map(card => <Card key={card.id} card={card} wonStatus={card.right}/>)
    }

    render() {
        const currentCard = this.state.shuffledCards[this.state.currentCardIndex]
        if (!currentCard && !this.state.completedCards.length) return null
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
                    {currentCard ? <button className="star-card-button" onClick={this.handleStarCard}>{currentCard.is_starred ? "Unstar Card": "Star Card"}</button> : null}
                </section>
                <section className="game-container-right-section">
                    {this.state.currentCardIndex+1 > this.state.shuffledCards.length ? 
                        <div className="game-container-card-holder-over">
                            {this.reviewGame()}
                        </div>
                        :
                        <>
                            <div className="game-container-card-holder">
                                <Card key={currentCard.id} card={currentCard} />
                            </div>
                            <div className="game-buttons">
                                <button className="right-button" onClick={this.handleRight}>RIGHT</button>
                                <button className="wrong-button" onClick={this.handleWrong}>WRONG</button>
                                <button className="skip-button" onClick={this.handleSkipped}>SKIP</button>
                            </div>
                        </>
                    }
                </section>
            </section>
        )
    }

}

export default GameContainer
