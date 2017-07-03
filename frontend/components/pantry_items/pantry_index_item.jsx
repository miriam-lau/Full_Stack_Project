import merge from 'lodash/merge';
import React from 'react';
import { Link } from 'react-router-dom';

import { allMeasurements } from '../utils/measurements';
import { FontIcon, TextField } from 'material-ui/';
import { underlineStyle, underlineFocusStyle, quantityStyle, itemStyleDefault, itemStyleCategory, styles } from '../utils/material_ui_styles';


function ErrorBanner1(props) {
  if (props.message != null) {
    return (
      <div className="pantry-item-error">{ props.message }</div>
    );
  } else {
    return null;
  }
}

function ErrorBanner2(props) {
  if (props.message != null) {
    return (
      <div className="pantry-item-error">{ props.message }</div>
    );
  } else {
    return null;
  }
}

class PantryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    let pantryItem = this.props.pantryItem;
    this.state = { id: pantryItem.id, user_id: pantryItem.user_id,
      category: pantryItem.category, temp: '', currentQuantity: '', quantityError: '', nameError: '' };

    this.parseUpdateQuantity = this.parseUpdateQuantity.bind(this);
    this.checkError = this.checkError.bind(this);
    this.update = this.update.bind(this);
    this.currentQuantity = this.props.pantryItem.quantity;
    this.handleQuantityChange = this.handleQuantityChange.bind(this);

    if (pantryItem.unit != null && pantryItem.unit.length !== 0) {
      this.currentQuantity = this.currentQuantity + " " + pantryItem.unit;
    }
  }

  parseUpdateQuantity(str) {
    let words = str.split(' ');
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
      return {error: "Quantity must begin with a number"};
    }

    words = splitFirstWord.concat(words);
    words = words.filter(function(el) {
      return (el.trim() !== '');
    });

    let quantity = words.shift();
    let unit = words[0];
    let convertedUnit = null;

    if (unit != null) {
      if (unit[unit.length - 1] == '.') {
        unit = unit.substring(0, unit.length - 1);
      }

      for (let i = 0; i < allMeasurements.length; i++) {
        if (allMeasurements[i].includes(unit)) {
          convertedUnit = (quantity === '1' ? allMeasurements[i][0] : allMeasurements[i][1]);
          break;
        }
      }
    }

    if (convertedUnit === null && unit != null) {
      return {error: "Quantity must have a valid unit"};
    }

    return {quantity: parseFloat(quantity), unit: convertedUnit};
  }

  handleQuantityChange() {
    return e => {
      let parsedUpdateQuantity = this.parseUpdateQuantity(e.target.value);
      if (parsedUpdateQuantity.error != null) {
        this.props.updateQuantityDisplay(this.props.pantryItem.id, e.target.value);
      } else {
        let updatedPantryItem = merge({}, this.props.pantryItem);
        updatedPantryItem.currentQuantityDisplay = e.target.value;
        updatedPantryItem.quantity = parsedUpdateQuantity.quantity;
        updatedPantryItem.unit = parsedUpdateQuantity.unit;
        this.props.updatePantryItem({pantry_item: updatedPantryItem});
      }
    }
  }

  update(property) {
    return e => {
      if (property === 'temp') {
        this.currentQuantity = e.target.value;
      }

      if (property === 'name') {
        if (e.target.value === '') {
          return this.setState({nameError: "Name cannot be blank"});
        } else {
          this.setState({nameError: ''});
        }
      }

      if (property === "category") {
        this.setState({ [property]: e.target.value });
      }

      this.setState({[property]: e.target.value}, () => {
        if (this.state.temp === '') {
          const pantryItem = this.state;
          this.props.updatePantryItem({pantry_item: pantryItem});
        } else {
          this.parseUpdateQuantity(this.state.temp);
        }
      });
    }
  }

  checkError() {
    // let errorMessage = this.parseUpdateQuantity(this.currentQuantity);
    // if (errorMessage != null) {
    //   this.setState({quantityError: errorMessage});
    // }
  }

// put onBlur for name update
  render() {
    const pantryItem = this.props.pantryItem;
    const deletePantryItem = this.props.deletePantryItem;
    return (
      <div>
        <div className="update-pantry-form-div">

          <form className="update-pantry-form">
            <TextField id="text-field-default"
              value={ pantryItem.currentQuantityDisplay }
              underlineFocusStyle ={underlineFocusStyle}
              underlineStyle={underlineStyle}
              style={quantityStyle}
              onChange={this.handleQuantityChange()}
              onBlur={this.checkError}
            />

            {pantryItem.category === '' ?
              <TextField id="text-field-default"
                value={ pantryItem.name }
                underlineFocusStyle ={underlineFocusStyle}
                underlineStyle={underlineStyle}
                style={itemStyleCategory}
                onChange={this.update('name')}
              /> :
              <TextField id="text-field-default"
                value={ pantryItem.name }
                underlineFocusStyle ={underlineFocusStyle}
                underlineStyle={underlineStyle}
                style={itemStyleDefault}
                onChange={this.update('name')}
              />
            }

            {pantryItem.category === '' ?
              <select className="pantry-uncategorized"
                onChange={this.update("category")}>
                <option selected="true" disabled="disabled">Select a Category</option>
                <option value="Baking and Dry Goods">Baking and Dry Goods</option>
                <option value="Beverages">Beverages</option>
                <option value="Bread and Bakery">Bread and Bakery</option>
                <option value="Canned and Jarred Goods">Canned and Jarred Goods</option>
                <option value="Dairy">Dairy</option>
                <option value="Dried Herbs and Spices">Dried Herbs and Spices</option>
                <option value="Frozen Foods">Frozen Foods</option>
                <option value="Fruits and Vegetables">Fruits and Vegetables</option>
                <option value="Meat and Seafood">Meat and Seafood</option>
                <option value="Oils and Sauces">Oils and Sauces</option>
                <option value="Snacks">Snacks</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select> : ''}
          </form>

          <i className="material-icons trash-can"
            style={styles}
            onClick={() => deletePantryItem(pantryItem.id)}>
            delete_forever</i>
        </div>

        <ErrorBanner1 message={this.state.quantityError} />
        <ErrorBanner2 message={this.state.nameError} />
      </div>
    );
  }
}

export default PantryIndexItem;

// update property: attempt to update item with category change
// if (property === "category") {
//   this.setState({[property]: e.target.value}, () => {
//     let allItems = this.props.pantryItems;
//
//     for (var i = 0; i < allItems.length; i++) {
//       if (allItems[i].category !== this.state.category) {
//         continue;
//       }
//
//       let itemName = allItems[i].name;
//       if (itemName !== this.props.pantryItem.name) {
//         continue;
//       }
//

//       let itemUnit = allItems[i].unit;
//       if (itemUnit === 'inch' || itemUnit === 'inches') {
//         itemUnit = 'inch';
//       } else if (itemUnit === 'foot' || itemUnit === 'feet') {
//         itemUnit = 'foot';
//       } else if (itemUnit.charAt(itemUnit.length - 1) === 's') {
//         itemUnit = itemUnit.substring(0, (itemUnit.length - 1));
//       }
//

//       let convertedUnit = this.props.pantryItem.unit;
//
//       if (convertedUnit === 'inch' || convertedUnit === 'inches') {
//         convertedUnit = 'inch';
//       } else if (convertedUnit === 'foot' || convertedUnit === 'feet') {
//         convertedUnit = 'foot';
//       } else if (convertedUnit.charAt(convertedUnit.length - 1) === 's') {
//         convertedUnit = convertedUnit.substring(0, (convertedUnit.length - 1));
//       }
//
//       let itemQuantity = parseFloat(this.props.pantryItem.quantity);
//       if (convertedUnit !== itemUnit) {
//         continue;
//       } else {
//         itemQuantity += parseFloat(allItems[i].quantity);
//       }
//
//       if (itemQuantity > 1 && convertedUnit !== '') {
//         if (convertedUnit === 'inch') {
//           convertedUnit = 'inches';
//         } else if (convertedUnit === 'foot') {
//           convertedUnit = 'feet';
//         } else {
//           convertedUnit += 's';
//         }
//       }
//

//
//       let pantryItem = {id: allItems[i].id, name: this.props.pantryItem.name, category: allItems[i].category, quantity: itemQuantity, unit: convertedUnit};
//

//
//       this.props.updatePantryItem({pantryItem});
//       return true;
//     }
//   });
// }
