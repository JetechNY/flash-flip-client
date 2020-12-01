import React from 'react'
import NavBar from './NavBar'

function Header(props) {

    return (
        <section className="header">
            <section className="header-logo">
                <a href="/" className="header-logo">FLASH-FLIP</a>
            </section>
            <section className="header-navbar">
                <hr className="header-separator" />
                {props.loggedIn ? <NavBar handleLogout={props.handleLogout}/> : null}
            </section>
        </section>
    )

} 

export default Header