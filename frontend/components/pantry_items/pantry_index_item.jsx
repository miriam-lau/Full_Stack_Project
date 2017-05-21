import React from 'react';
import TextField from 'material-ui/TextField';

import { Link } from 'react-router-dom';

const textboxUnderlineStyle = {
  'border-color': '#333399'
}

// var changeTimer = false;

class PantryIndexItem extends React.Component {
  constructor(props) {
    super(props)
    let pantry_item = this.props.pantry_item
    this.state = { name: pantry_item.name, quantity: pantry_item.quantity,
      unit: pantry_item.unit }
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  handleChange(event) {
    event.preventDefault();
    const pantry_item = this.state;
    // if (changeTimer !== false) {
    //   clearTimeout(changeTimer);
    //   changeTimer = setTimeout(function(){
    this.props.editPantryItem({pantry_item})
      .then(data => this.props.history.push(`/pantry_items/${data.id}`));
      //   changeTimer = false;
      // },300);
    // }
  }

  render() {
    const pantry_item = this.props.pantry_item;
    const deletePantryItem = this.props.deletePantryItem;

    return (
      <div>
        <li>
          <TextField className="pantry-item-col1" id="text-field-default"
            value={ this.state.name }
            onChange={this.handleChange}
            underlineFocusStyle ={textboxUnderlineStyle}
            style={{width: '30%'}}
          />

          <TextField className="pantry-item-col" id="text-field-default"
            value={ this.state.quantity }
            underlineFocusStyle ={textboxUnderlineStyle}
            style={{width: '5%'}}
          />

          <TextField className="pantry-item-col" id="text-field-default"
            value={ this.state.unit }
            underlineFocusStyle ={textboxUnderlineStyle}
            style={{width: '10%'}}
          />

          <button className="pantry-button"
            onClick={ () => {deletePantryItem(pantry_item.id)} }>
            Delete Item
          </button>
        </li>
      </div>
    );
  }
}

export default PantryIndexItem;

// <Link to={`/pantry_items/${pantry_item.id}`}></Link>
// <button className="pantry-button"
//   onClick={ () => {editPantryItem(pantry_item.id)} }>
//   Update Pantry Item
// </button>
