import React from 'react'
import { Form } from 'semantic-ui-react'

class CardForm extends React.Component {

  state = {
    term: "",
    definition: ""
  }

  handleChange = (e) => this.setState({[e.target.name]: e.target.value})

  handleSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({...this.state, is_starred: false, category_id: this.props.filteredCategoryId})
    })
    .then(resp => resp.json())
    .then(newCard => {
      this.props.handleAddCard(newCard)
      this.props.handleShowCardForm()
    })
    .catch(err => console.log(err))

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
          </Form.Group>
          <Form.Button>Submit</Form.Button>
          <br/>
        </Form>
      </div>
    )
  }
}

export default CardForm
