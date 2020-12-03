import { render } from '@testing-library/react'
import React from 'react'

class Profile extends React.Component {

    state = {
        username: "",
        email: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/users/${this.props.user.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${this.props.jwt}`
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(resp => resp.json())
        .then(data => {console.log("return", data)})
        .catch(err => console.log(err))
        e.target.reset()
    }


    render(){
        console.log("orig props", this.props.user)
        return(
            <section className="profile-container">
                <h1>Hello, {this.props.user.username}.</h1>
                <h4>Please update your information below</h4>
                <div className="edit-container">
                    <form onSubmit={this.submitHandler} className="edit-form">
                        <div>
                        Enter a new Username:
                        <input type="text" name="username" placeholder="Enter a new Username" className="input-text" value={this.state.name} onChange={this.changeHandler}/>
                        </div>
                        <div>
                        Enter a new Email:
                        <input type="text" name="email" placeholder="Enter a new Email" className="input-text" value={this.state.email} onChange={this.changeHandler}/>
                        </div>
                        <div>
                        Enter a new Password:
                        <input type="password" name="password" placeholder="Enter a new Password" className="input-text" value={this.state.password} onChange={this.changeHandler}/>
                        </div>
                        <div>
                        <input type="submit" name="submit" value="Update User Info" className="submit"/>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}



export default Profile;
