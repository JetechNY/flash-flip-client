import React from 'react'
import { NavLink } from 'react-router-dom'


function NavBar(props) {

    return (
        <section className="navbar">
            <NavLink to="/categories" className="navbar-link">ALL CATEGORIES</NavLink>
            <button className="navbar-link" onClick={props.handleLogout}>LOG OUT</button>
        </section>
    )

} 

export default NavBar