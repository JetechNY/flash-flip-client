import React from 'react'
import { Form } from 'semantic-ui-react'

class CardForm extends React.Component {

  state = {
    term: "",
    definition: "",
    is_starred: false,
    category_id: 1 //temp, how to make it for specific category?
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
        <h3>Please add a Card!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Term" placeholder="Term" name="term" value={this.state.term} onChange={this.handleChange}/>
            <Form.Input fluid label="Definition" placeholder="Definition" name="definition"value={this.state.definition} onChange={this.handleChange} />
            {/* Need some kind of drop down menu for all exisiting categories. */}
          </Form.Group>
          <Form.Button>Submit</Form.Button>
          <br/>
        </Form>
      </div>
    )
  }
}

export default CardForm
