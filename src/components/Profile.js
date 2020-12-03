import React from 'react'

function Profile(props) {


    return(
        <h1>Hello, {props.user.username}.</h1>
    )
}

export default Profile;