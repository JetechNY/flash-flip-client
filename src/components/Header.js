import React from 'react'
import NavBar from './NavBar'
import LoginForm from './LoginForm'
import { useHistory } from 'react-router-dom' 


function Header(props) {

    const history = useHistory()

    return (
        <section className="header">
            <section className="header-logo">
                <a href="/" className="header-logo">FLASH-FLIP</a>
            </section>
            <section className="header-navbar">
                <hr className="header-separator" />
                {props.loggedIn ? <NavBar /> : null}
            </section>
        </section>
    )

} 

export default Header