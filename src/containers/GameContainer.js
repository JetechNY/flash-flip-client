import React from 'react'
import FlashCard from '../components/FlashCard'
import { Button } from 'semantic-ui-react'

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
        // let shuffledCards = this.shuffleCards(this.props.cards)
        // this.setState({shuffledCards: shuffledCards})
        this.fetchAndShuffleCards()
    }

    fetchAndShuffleCards = () => {
        fetch(`http://localhost:3000/categories/${this.props.filteredCategory.id}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${this.props.jwt}`}
        })
        .then(resp => resp.json())
        .then(category => {
            this.setState({shuffledCards: this.shuffleCards(category.cards)})
        })
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

    handleRight = () => {
        const currentCard = this.state.shuffledCards[this.state.currentCardIndex]
        this.setState(prevState => {
            return ({
                rightCounter: prevState.rightCounter += 1,
                currentCardIndex: prevState.currentCardIndex += 1,
                completedCards: [...prevState.completedCards, {...currentCard, right: "Right"}]
            })
        })
    }

    handleWrong = () => {
        const currentCard = this.state.shuffledCards[this.state.currentCardIndex]
        this.setState(prevState => {
            return ({
                wrongCounter: prevState.wrongCounter += 1,
                currentCardIndex: prevState.currentCardIndex += 1,
                completedCards: [...prevState.completedCards, {...currentCard, right: "Wrong"}]
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
        return this.state.completedCards.map(card => <FlashCard key={card.id} card={card} wonStatus={card.right} parentIsGameContainer={true}/>)
    }

    render() {
        const currentCard = this.state.shuffledCards[this.state.currentCardIndex]
        if (!currentCard && !this.state.completedCards.length) return null
        return (
            <section className="game-container">
                <section className="game-container-left-section">
                    <Button onClick={this.props.handleGameState}>Exit Study Session</Button>
                    <div className="timer">
                        <h3>Timer</h3>
                        <p>00:00sec</p>
                    </div>
                    <div className="game-stats">
                        <h3>Study Stats</h3>
                        <p>right: {this.state.rightCounter}</p>
                        <p>wrong: {this.state.wrongCounter}</p>
                        <p>skipped: {this.state.skippedCounter}</p>
                        {/* {this.state.currentCardIndex+1 > this.state.shuffledCards.length ? <h3 className="percent-right-header">Score</h3> : null} */}
                        {this.state.currentCardIndex+1 > this.state.shuffledCards.length ? <h1 className="percent-right-num">{Math.round(this.state.rightCounter/this.state.shuffledCards.length * 100)}%</h1> : null}
                    </div>
                </section>
                <section className="game-container-right-section">
                    {this.state.currentCardIndex+1 > this.state.shuffledCards.length ? 
                        <div className="game-container-right-section-review">
                            {this.reviewGame()}
                        </div>
                        :
                        <div className="game-container-right-section-session">
                            <FlashCard key={currentCard.id} card={currentCard} parentIsGameContainer={true} jwt={this.props.jwt} />
                            <div className="game-buttons">
                                <Button id="right-button" onClick={this.handleRight}>RIGHT</Button>
                                <Button id="wrong-button" onClick={this.handleWrong}>WRONG</Button>
                                <Button id="skip-button" onClick={this.handleSkipped}>SKIP</Button>
                            </div>
                        </div>
                    }
                </section>
            </section>
        )
    }

}

export default GameContainer
