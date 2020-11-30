import './App.css';
import React from 'react'
import MainContainer from './containers/MainContainer'
import Header from './components/Header'
import Footer from './components/Footer'

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
        <Header loggedIn={this.state.loggedIn} handleLoginFormSubmit={this.handleLoginFormSubmit} />
        {this.state.loggedIn ? <MainContainer /> : null }
        <Footer />        
      </section>
    );
  }
}

export default App;
