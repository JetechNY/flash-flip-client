import React from 'react'

const CardSearch = props => {
    
  const localHandleCardSearchChange = (e) => {
    props.handleCardSearchChange(e.target.value)
  }
  
    return (
      <div className="ui search">
        <div className="ui icon input">
          <input value={props.searchTerm} onChange={localHandleCardSearchChange} className="prompt"/>
          <i className="search icon" />
          <br/>
        </div>
      </div>
    )
}

export default CardSearch
