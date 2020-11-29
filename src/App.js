import './App.css';
import React from 'react'
import MainContainer from './containers/MainContainer'
import Header from './components/Header'

class App extends React.Component {

  state = {
    loggedIn: false
  }

  handleLoginFormSubmit = () => {
    this.setState({loggedIn: true})
  }

  render () {
    return (
      <section className="App">
        <Header loggedIn={this.state.loggedIn} />
        {this.state.loggedIn ? <MainContainer /> : null }        
      </section>
    );
  }
}

export default App;
