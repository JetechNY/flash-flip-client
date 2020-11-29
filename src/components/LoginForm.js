import React from 'react'


class LoginForm extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleLoginFormChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleLoginFormSubmit = (e) => {
        e.preventDefault()
        console.log("logging in!", this.state.username, this.state.password)
    }

    render() {
        return (
            <section className="login-form-container">
                <form className="login-form" onSubmit={this.handleLoginFormSubmit}>
                    <input className="login-input" name="username" value={this.state.username} onChange={this.handleLoginFormChange} placeholder="username"></input>
                    <input className="login-input" name="password" value={this.state.password} onChange={this.handleLoginFormChange} placeholder="password" type="password"></input>
                    <button className="login-button">Login</button>
                </form>
            </section>
        )
    }

}

export default LoginForm