import React from 'react'
import { Form } from 'semantic-ui-react'

class CategoryForm extends React.Component {

  state = {
    user_id: 2, //temp makes all new categories belong to user 2
    name: ""
  }

  handleChange = (e) => this.setState({[e.target.name]: e.target.value})

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addCategory(this.state)
    e.target.reset()
  }


  render() {
    return (
      <div>
        <br/>
        <h3>Please add a Category!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Category Name" name="name" value={this.state.name} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
          <br/>
        </Form>
      </div>
    )
  }
}

export default CategoryForm
