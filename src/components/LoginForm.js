import React from 'react'


class LoginForm extends React.Component {

    state = {
        usernameSignIn: '',
        passwordSignIn: '',
        emailSignUp: '',
        usernameSignUp: '',
        passwordSignUp: ''
    }

    handleFormChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    localHandleLoginFormSubmit = (e) => {
        e.preventDefault()
        this.props.handleLoginFormSubmit()
    }

    localHandleSignUpFormSubmit = (e) => {
        e.preventDefault()
        console.log("signing up!", this.state.emailSignUp, this.state.usernameSignUp, this.state.passwordSignUp)
    }

    render() {
        return (
            <section className="login-form-container">
                <form className="login-form" onSubmit={this.localHandleLoginFormSubmit}>
                    <input className="login-input" name="usernameSignIn" value={this.state.usernameSignIn} onChange={this.handleFormChange} placeholder="username"></input>
                    <input className="login-input" name="passwordSignIn" value={this.state.passwordSignIn} onChange={this.handleFormChange} placeholder="password" type="password"></input>
                    <button className="login-button">log in</button>
                </form>
                <p className="login-form-separator">...or sign up!</p>
                <form className="create-account-form" onSubmit={this.localHandleSignUpFormSubmit}>
                    <input className="create-account-input" name="emailSignUp" value={this.state.emailSignUp} onChange={this.handleFormChange} placeholder="email address"></input>
                    <input className="create-account-input" name="usernameSignUp" value={this.state.usernameSignUp} onChange={this.handleFormChange} placeholder="username"></input>
                    <input className="create-account-input" name="passwordSignUp" value={this.state.passwordSignUp} onChange={this.handleFormChange} placeholder="password" type="password"></input>
                    <button className="create-account-button">sign up</button>
                </form>
            </section>
        )
    }

}

export default LoginForm