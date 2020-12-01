import './App.css';
import React from 'react'
import MainContainer from './containers/MainContainer'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

class App extends React.Component {

  state = {
    loggedIn: JSON.parse(window.localStorage.getItem("is-logged-in")) || false,
    user: {},
    jwt: ''
  }

  componentDidMount() {
    this.setState({jwt: window.localStorage.getItem("jwt")})
  }

  handleLoginFormSubmit = ({user, jwt}) => {
    if (user) {
      this.setState({loggedIn: true, user: user, jwt: jwt})
      window.localStorage.setItem("is-logged-in", true)
      window.localStorage.setItem("jwt", jwt)
    } else {
      window.alert("Incorrect Username or Password. Try again.")
    }
  }

  handleCreateAccount = ({user, jwt}) => {
    this.setState({loggedIn: true, user: user, jwt: jwt})
    window.localStorage.setItem("is-logged-in", true)
    window.localStorage.setItem("jwt", jwt)
  }

  handleLogout = () => {
    this.setState({loggedIn: false, user: {}, jwt: ''})
    window.localStorage.setItem("is-logged-in", false)
    window.localStorage.setItem("jwt", "")
  }

  render () {
    return (
      <section className="App">
        <BrowserRouter>
          <Header loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} />
          <Switch>
            <Route path="/categories">
              {this.state.loggedIn ? <MainContainer user={this.state.user} jwt={this.state.jwt}/> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {this.state.loggedIn ? <Redirect to="/categories" /> : <LoginForm loggedIn={this.state.loggedIn} handleLoginFormSubmit={this.handleLoginFormSubmit} handleCreateAccount={this.handleCreateAccount}/>}
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
