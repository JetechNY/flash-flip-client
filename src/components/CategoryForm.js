import React from "react";
import { Form } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

class CategoryForm extends React.Component {
  state = {
    name: "",
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addCategory(this.state);
    e.target.reset();
  };

  render() {
    return (
      <div className="category-form">
        <h3>Please add a Category!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Category Name"
              placeholder="Category Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button className="category-form-submit">Submit</Form.Button>
          <Button onClick={this.props.handleShowCategoryForm}>Cancel</Button>
        </Form>
      </div>
    );
  }
}

export default CategoryForm;
