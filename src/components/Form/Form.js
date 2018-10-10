import React, { Component } from 'react';
import './Form.scss';

class PetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animalType: 'shibes',
      animalNumber: 1,
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onUpdate(this.state);
  }

  render() {
    return (
      <form>
        Animal type:
        <select
          name="animalType"
          value={this.state.animalType}
          onChange={this.handleInputChange}
          className="form-control form-select">

          <option value="shibes">Shibes</option>
          <option value="cats">Cats</option>
          <option value="birds">Birds</option>
          <option value="random">Random</option>
        </select>

        Animals number:
        <input
          type="number"
          name="animalNumber"
          value={this.state.animalNumber}
          onChange={this.handleInputChange}
          className="form-control form-number"
          min="1" max="10" />

        <input
          type="submit"
          value={this.props.isPending ? "Loading" : "Search"}
          onClick={this.handleSubmit}
          className="form-control form-submit"
          disabled={this.props.isPending}
        />
      </form>
    );
  }
}

export default PetForm;
