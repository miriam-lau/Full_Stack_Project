import React from 'react';
import { Link } from 'react-router-dom';

class PantryItemUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: this.props.category, name: this.props.name,
      quantity: this.props.quantity, unit: this.props.unit};

    this.categories = ['Beverage', 'Bread & Bakery', 'Canned & Jarred',
      'Dairy', 'Dry & Baking', 'Frozen', 'Fruit', 'Meat & Seafood',
      'Vegetable'];

    this.units = ['each', 'cup', 'pint', 'quart', 'gallon', 'fluid ounce',
      'teaspoon', 'tablespoon', 'ounce', 'pound'];

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.requestPantryItem(this.props.match.params.id)
      .then(()=> {this.setState(this.props.pantry_item);});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.requestPantryItem(nextProps.match.params.id);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const pantry_item = this.state;
    this.props.editPantryItem({pantry_item})
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

  update (property) {
    return e => this.setState({[property]: e.target.value});
  }

  render() {
    return (
      <div className="pantry-item-form">
        <form className="pantry-form" onSubmit={this.handleSubmit}>
          <ul>{this.renderErrors()}</ul>

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
          <select value={this.state.unit} onChange={this.update('unit')}
            defaultValue="Select Unit of Measure">
            {this.units.map((unit, idx) => {
              return <option key={idx} value={unit} >{unit}</option>;
            })}
          </select>

          <br />
          <br />
          <button className="pantry-button">Update Pantry Item</button>
        </form>
        <Link to="/pantry_items">Back to Pantry Index</Link>
      </div>
    )
  }
}

export default PantryItemUpdateForm;
