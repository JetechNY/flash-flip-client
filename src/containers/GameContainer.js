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
                </section>
                <section className="game-container-middle-section">
                    <div className="card">
                        <Card key={this.state.currentCard.id} card={this.state.currentCard} />
                    </div>
                </section>
                <section className="game-container-right-section">
                </section>
            </section>
        )
    }

}

export default GameContainer