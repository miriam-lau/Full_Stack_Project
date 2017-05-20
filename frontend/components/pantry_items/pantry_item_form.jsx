import React from 'react';

class PantryItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: 'None', name: '', quantity: 0, unit: 'each' };

    this.categories = ['None', 'Beverage', 'Bread & Bakery', 'Canned & Jarred',
      'Dairy', 'Dry & Baking', 'Frozen', 'Fruit', 'Meat & Seafood',
      'Vegetable'];

    this.units = ['each', 'cup', 'pint', 'quart', 'gallon', 'fluid ounce',
      'teaspoon', 'tablespoon', 'ounce', 'pound'];

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const pantry_item = this.state;
    this.props.createPantryItem({pantry_item})
      .then(data => this.props.history.push(`/pantry_items/${data.id}`));
  }

  renderErrors() {
    if (this.props.errors) {
      return (
        <ul className="pantry-form-error">
          { this.props.errors.map((error, idx) => (
            <li key={`error-${idx}`}>{ error }</li>
          ))}
        </ul>
      );
    }
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

//quantity and unit of measure in one input
//split on space
  render() {
    return (
      <div className="pantry-item-form">
        <form className="pantry-form" onSubmit={this.handleSubmit}>
          <ul>{this.renderErrors()}</ul>

          <label>Category</label>
          <br />
          <select value={this.state.category} onChange={this.update('category')}>
            {this.categories.map((category, idx) => {
              return <option key={idx} value={category} >{category}</option>;
            })}
          </select>
          <br/>
          <br/>

          <label>Item Name</label>
          <br />
          <input className="pantry-input" type="text" value={this.state.name}
            onChange={this.update('name')}/>
          <br/>
          <br/>

          <label>Quantity</label>
          <br />
          <input className="pantry-input" type="number" value={this.state.quantity}
            onChange={this.update('quantity')}/>
          <br/>
          <br/>

          <label>Unit</label>
          <br />
          <select value={this.state.unit} onChange={this.update('unit')}>
            {this.units.map((unit, idx) => {
              return <option key={idx} value={unit} >{unit}</option>;
            })}
          </select>

          <br />
          <br />
          <button className="pantry-button">Add Pantry Item</button>
        </form>
      </div>
    );
  }
}

export default PantryItemForm;
