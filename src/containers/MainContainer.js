import React from 'react'
import CategoryContainer from './CategoryContainer'
import CardContainer from './CardContainer'
import { Container } from 'semantic-ui-react'
import GameContainer from './GameContainer'

class MainContainer extends React.Component {

    state = {
        filteredCards: []
    }


    handleFilterCards = (filteredCards) => {
        this.setState({filteredCards: filteredCards})
    }

    render() {
        return (
            <Container>
                <div className="main-container">
                    <CategoryContainer handleFilterCards={this.handleFilterCards}/>
                    {this.state.filteredCards.length > 0 ? <CardContainer filteredCards={this.state.filteredCards} /> : null}
                    {/* {this.state.filteredCards.length > 0 ? <GameContainer cards={this.state.filteredCards}/>: null} */}
                </div>
            </Container>
        )
    }
}

export default MainContainer
