import React from 'react'
import { NavLink } from 'react-router-dom'


function NavBar(props) {

    return (
        <section className="navbar">
            <span className="navbar-links">
                <NavLink to="/" className="navbar-link">ALL CATEGORIES</NavLink>
                <NavLink to="/profile" className="navbar-link">MY PROFILE</NavLink>
                <p className="navbar-link" onClick={props.handleLogout}>LOG OUT</p>
            </span>
            <span className="welcome-message">Welcome {props.user.username}!</span>
        </section>

    )

} 

export default NavBar