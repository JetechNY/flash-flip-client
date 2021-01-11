import "./App.css";
import React from "react";
import MainContainer from "./containers/MainContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  state = {
    user: JSON.parse(window.localStorage.getItem("user")) || {},
    jwt: window.localStorage.getItem("jwt") || "",
  };

  handleLoginFormSubmit = ({ user, jwt }) => {
    if (user) {
      this.setState({ user: user, jwt: jwt });
      window.localStorage.setItem("user", JSON.stringify(user));
      window.localStorage.setItem("jwt", jwt);
    } else {
      window.alert("Incorrect Username or Password. Try again.");
    }
  };

  handleCreateAccount = ({ user, jwt }) => {
    this.setState({ user: user, jwt: jwt });
    window.localStorage.setItem("user", JSON.stringify(user));
    window.localStorage.setItem("jwt", jwt);
  };

  handleLogout = () => {
    this.setState({ user: {}, jwt: "" });
    window.localStorage.setItem("user", JSON.stringify({}));
    window.localStorage.setItem("jwt", "");
  };

  updateUserHandler = (userObj) => {
    fetch(`http://localhost:3000/users/${this.state.user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.state.jwt}`,
      },
      body: JSON.stringify(userObj),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ user: data });
        window.localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <section className="App">
        <BrowserRouter>
          <Header
            loggedIn={!!this.state.jwt}
            handleLogout={this.handleLogout}
            user={this.state.user}
          />
          <Switch>
            <Route path="/profile">
              {!!this.state.jwt ? (
                <Profile
                  user={this.state.user}
                  jwt={this.state.jwt}
                  updateUserHandler={this.updateUserHandler}
                />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/categories">
              {!!this.state.jwt ? (
                <MainContainer user={this.state.user} jwt={this.state.jwt} />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/login">
              {!!this.state.jwt ? (
                <Redirect to="/categories" />
              ) : (
                <LoginForm
                  loggedIn={!!this.state.jwt}
                  handleLoginFormSubmit={this.handleLoginFormSubmit}
                  handleCreateAccount={this.handleCreateAccount}
                />
              )}
            </Route>
            <Route exact path="/">
              {!!this.state.jwt ? (
                <Redirect to="/categories" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </section>
    );
  }
}

export default App;
