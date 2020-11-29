import React from 'react'
import Card from '../components/Card'

class GameContainer extends React.Component {

    state = {
        currentCard: ''
    }

    componentDidMount() {
        this.setState({currentCard: this.props.cards[0]})
    }

    render() {
        return (
            <section className="game-container">
                <section className="game-container-left-section">
                    <div className="timer">
                        timer: 00:00sec
                    </div>
                    <div className="game-stats">
                        <p>right: 0</p>
                        <p>wrong: 0</p>
                        <p>skipped: 0</p>
                    </div>
                    <button className="star-card-button">Star Card</button>
                </section>
                <section className="game-container-right-section">
                    <div className="card">
                        <Card key={this.state.currentCard.id} card={this.state.currentCard} />
                        <div className="game-buttons">
                            <button className="right-button">RIGHT</button>
                            <button className="wrong-button">WRONG</button>
                            <button className="skip-button">SKIP</button>
                        </div>
                    </div>
                </section>
            </section>
        )
    }

}

export default GameContainer