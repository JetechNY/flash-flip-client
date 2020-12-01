import './App.css';
import React from 'react'
import MainContainer from './containers/MainContainer'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

class App extends React.Component {

  state = {
    loggedIn: JSON.parse(window.localStorage.getItem("is-logged-in")) || false
  }

  handleLoginFormSubmit = () => {
    this.setState({loggedIn: true})
    window.localStorage.setItem("is-logged-in", true)
  }

  handleLogout = () => {
    window.localStorage.setItem("is-logged-in", false)
    this.setState({loggedIn: false})
  }

  render () {
    return (
      <section className="App">
        <BrowserRouter>
          <Header loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} />
          <Switch>
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
