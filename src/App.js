import './App.css';
import React from 'react'
import MainContainer from './containers/MainContainer'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import GameContainer from './containers/GameContainer';

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
        <BrowserRouter>
          <Header />
          <Switch>
            {/* <Route path="/categories/:id" component={GameContainer}> */}
            <Route path="/categories">
              {this.state.loggedIn ? <MainContainer /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {this.state.loggedIn ? <Redirect to="/categories" /> : <LoginForm loggedIn={this.state.loggedIn} handleLoginFormSubmit={this.handleLoginFormSubmit}/>}
            </Route>
            <Route exact path="/">
              {this.state.loggedIn ? <Redirect to="/categories"/> : <Redirect to="/login" />}
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </section>
    );
  }
}

export default App;
