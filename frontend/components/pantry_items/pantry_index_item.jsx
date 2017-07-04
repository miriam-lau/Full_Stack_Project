import React from "react";
import { Link } from "react-router-dom";
import merge from "lodash/merge";

import updatePantry from "./update_pantry";
import { allMeasurements } from "../utils/measurements";
import { formCategory } from "../utils/item_categories";
import { FontIcon, TextField } from "material-ui/";
import { underlineStyle, underlineFocusStyle, quantityStyle, itemStyleDefault, itemStyleCategory, styles } from "../utils/material_ui_styles";


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
      name: pantryItem.name, category: pantryItem.category, quantity: pantryItem.quantity, unit: pantryItem.unit, error: ""};

    this.parseUpdateQuantity = this.parseUpdateQuantity.bind(this);
    this.checkError = this.checkError.bind(this);
    this.update = this.update.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  parseUpdateQuantity(str) {
    let words = str.split(" ");
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
      return {error: "Quantity must begin with a number"};
    }

    words = splitFirstWord.concat(words);
    words = words.filter(function(el) {
      return (el.trim() !== "");
    });

    let quantity = words.shift();
    let unit = words[0];
    let convertedUnit = null;

    if (unit != null) {
      if (unit[unit.length - 1] == ".") {
        unit = unit.substring(0, unit.length - 1);
      }

      for (let i = 0; i < allMeasurements.length; i++) {
        if (allMeasurements[i].includes(unit)) {
          convertedUnit = (quantity === "1" ? allMeasurements[i][0] : allMeasurements[i][1]);
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
      if (property === "name") {
        if (e.target.value === "") {
          return this.setState({error: "Name cannot be blank"});
        }
      }

      // category updates only happens for existing uncategorized items.
      // pantryItems = array; name, category, unit = strings; quantity: float;
      // updatePantry return true if update item is successful
      if (property === "category") {
        this.setState({ [property]: e.target.value }, () => {
          let successful = updatePantry(this.props.pantryItems,
              this.state.id, this.state.name, this.state.category, this.state.unit, parseFloat(this.state.quantity), this.props.updatePantryItem, this.props.deletePantryItem);
          if (successful) {
            return true;
          }
        });
      }

      this.setState({error: ""});
      let currentQuantityDisplay = this.state.quantity;
      if (this.state.unit != null) {
        currentQuantityDisplay += " " + this.state.unit;
      }
      this.setState({[property]: e.target.value, currentQuantityDisplay: currentQuantityDisplay}, () => {
        const pantryItem = this.state;
        this.props.updatePantryItem({pantry_item: pantryItem});
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

            {pantryItem.category === "" ?
              <TextField id="text-field-default"
                value={ pantryItem.name }
                underlineFocusStyle ={underlineFocusStyle}
                underlineStyle={underlineStyle}
                style={itemStyleCategory}
                onChange={this.update("name")}
              /> :
              <TextField id="text-field-default"
                value={ pantryItem.name }
                underlineFocusStyle ={underlineFocusStyle}
                underlineStyle={underlineStyle}
                style={itemStyleDefault}
                onChange={this.update("name")}
              />
            }

            {pantryItem.category === "" ?
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
              </select> : ""}
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
