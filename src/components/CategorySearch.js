import React from 'react'


const CategorySearch = props => {

return (
      <div className="ui search">
        <div className="ui icon input">
          <input onChange={props.handleCategorySearchChange} className="prompt" placeholder="Filter Categories"/>
          <i className="search icon" />
          <br/>
        </div>
      </div>
    )
}

export default CategorySearch
