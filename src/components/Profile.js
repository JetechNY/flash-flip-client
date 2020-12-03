import { render } from '@testing-library/react'
import React from 'react'
import { Button } from 'semantic-ui-react'

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

    componentDidMount = () =>{
        this.setState({
            username: this.props.user.username,
            email: this.props.user.email
        })
    }

    localUpdateUserHandler = (e) => {
        e.preventDefault()
        this.props.updateUserHandler(this.state)
    }

    render(){
        return(
            <section className="profile-container">
                <h1>Hello!</h1>
                <h4>Please update your information below</h4>
                <div className="edit-container">
                    <form onSubmit={this.localUpdateUserHandler} className="edit-form">
                        <div>
                        Enter a new Username:
                        <input type="text" name="username" placeholder="Enter a new Username" className="input-text" value={this.state.username} onChange={this.changeHandler}/>
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
                        <Button type="submit" name="submit" value="Update User Info" className="submit">Update User Info</Button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}



export default Profile;
