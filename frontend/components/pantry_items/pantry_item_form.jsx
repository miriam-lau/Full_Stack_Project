import React from 'react';
import { withRouter } from 'react-router-dom';

class PantryItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: '', name: '', quantity: 0, unit: '' };

    this.categories = ['Beverage', 'Bread & Bakery', 'Canned & Jarred',
      'Dairy', 'Dry & Baking', 'Frozen', 'Fruit', 'Meat & Seafood',
      'Vegetable'];

    this.units = ['each', 'cup', 'pint', 'quart', 'gallon', 'fluid ounce',
      'teaspoon', 'tablespoon', 'ounce', 'pound'] ;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createPantryItem(this.state)
      .then(data => this.props.history.push(`/pantry_items/${data.id}`));
  }

  renderErrors() {
    return (
      <div >
        <ul className="pantry-form-error">
        { this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{ error }</li>
        ))}
      </ul>
    </div>
    );
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
          <ul>{this.errors()}</ul>

          <label>Category</label>
          <br />
          <select value={this.state.category} onChange={this.update('category')}
            defaultValue="Select Food Category">
            {this.categories.map((category, idx) => {
              return <option key={idx} value={category} >{category}</option>;
            })}
          </select>
          <br/>
          <br/>

          <label>Name</label>
          <br />
          <input type="text" value={this.state.name}
            onChange={this.update('name')}/>
          <br/>
          <br/>

          <label>Quantity</label>
          <br />
          <input type="number" value={this.state.quantity}
            onChange={this.update('quantity')}/>
          <br/>
          <br/>

          <label>Unit</label>
          <br />
          <select value={this.state.unit} onChange={this.update('unit')}
            defaultValue="Select Unit of Measure">
            {this.units.map((unit, idx) => {
              return <option key={idx} value={unit} >{unit}</option>;
            })}
          </select>

          <br />
          <button>Add Pantry Item</button>
        </form>
      </div>
    );
  }
}

export default withRouter(PantryItemForm);
