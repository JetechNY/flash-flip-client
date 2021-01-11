import React from "react";

class LoginForm extends React.Component {
  state = {
    usernameSignIn: "",
    passwordSignIn: "",
    emailSignUp: "",
    usernameSignUp: "",
    passwordSignUp: "",
  };

  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  localHandleLoginFormSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: this.state.usernameSignIn,
          password: this.state.passwordSignIn,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.props.handleLoginFormSubmit(data);
      });
  };

  localHandleSignUpFormSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: this.state.usernameSignUp,
          password: this.state.passwordSignUp,
          email: this.state.emailSignUp,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.props.handleCreateAccount(data);
      });
  };

  render() {
    return (
      <section className="login-form-container">
        <form className="login-form" onSubmit={this.localHandleLoginFormSubmit}>
          <input
            className="login-input"
            name="usernameSignIn"
            value={this.state.usernameSignIn}
            onChange={this.handleFormChange}
            placeholder="username"
          ></input>
          <input
            className="login-input"
            name="passwordSignIn"
            value={this.state.passwordSignIn}
            onChange={this.handleFormChange}
            placeholder="password"
            type="password"
          ></input>
          <button className="login-button">Log In</button>
        </form>
        <p className="login-form-separator">...or sign up!</p>
        <form
          className="create-account-form"
          onSubmit={this.localHandleSignUpFormSubmit}
        >
          <input
            className="create-account-input"
            name="emailSignUp"
            value={this.state.emailSignUp}
            onChange={this.handleFormChange}
            placeholder="email address"
          ></input>
          <input
            className="create-account-input"
            name="usernameSignUp"
            value={this.state.usernameSignUp}
            onChange={this.handleFormChange}
            placeholder="username"
          ></input>
          <input
            className="create-account-input"
            name="passwordSignUp"
            value={this.state.passwordSignUp}
            onChange={this.handleFormChange}
            placeholder="password"
            type="password"
          ></input>
          <button className="create-account-button">Sign Up</button>
        </form>
      </section>
    );
  }
}

export default LoginForm;
