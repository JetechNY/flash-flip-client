import React from 'react'
import NavBar from './NavBar'
import LoginForm from './LoginForm'


function Header(props) {


    return (
        <section className="header">
            <section className="header-logo">
                <a href="/" className="header-logo">FLASH-FLIP</a>
            </section>
            <section className="header-navbar">
                <hr className="header-separator" />
                {props.loggedIn ? <NavBar /> : <LoginForm handleLoginFormSubmit={props.handleLoginFormSubmit}/>}
            </section>
        </section>
    )

} 

export default Header