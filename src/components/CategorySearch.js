import React from 'react'

const Search = props => {
    return (
      <div className="ui search">
        <div className="ui icon input">
          <input onChange={props.handleChange} className="prompt"/>
          <i className="search icon" />
          <br/>
        </div>
      </div>
    )
}

export default Search
