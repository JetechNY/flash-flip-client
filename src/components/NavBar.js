import React from 'react'
import { NavLink } from 'react-router-dom'


function NavBar(props) {

    return (
        <section className="navbar">
            <NavLink to="/categories" className="navbar-link">ALL CATEGORIES</NavLink>
            <p className="navbar-link" onClick={props.handleLogout}>LOG OUT</p>
        </section>
    )

} 

export default NavBar