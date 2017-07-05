import React from "react";
import { Link } from "react-router-dom";
import merge from "lodash/merge";

import updateGrocery from "./update_grocery";
import { allMeasurements } from "../utils/measurements";
import { Checkbox, TextField } from "material-ui";
import { formCategory } from "../utils/item_categories";
import { underlineFocusStyle, underlineStyle, quantityStyle, itemStyleDefault,
    itemStyleCategory, icon, styles } from "../utils/material_ui_styles";

class GroceryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantityError: "", nameError: "" };

    this.parseUpdateQuantity = this.parseUpdateQuantity.bind(this);
    this.showQuantityError = this.showQuantityError.bind(this);
    this.showNameError = this.showNameError.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  parseUpdateQuantity(str) {
    let words = str.split(" ");
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
      return { error: "Quantity must begin with a number" };
    }

    words = splitFirstWord.concat(words);
    words = words.filter(function(el) {
      return (el.trim() !== "");
    });

    let quantity = words.shift();
    let unit = words[0];
    let convertedUnit = null;

    if (unit != null) {
      if (unit[unit.length - 1] === ".") {
        unit = unit.substring(0, unit.length - 1);
      }
      for (let i = 0; i < allMeasurements.length; i++) {
        if (allMeasurements[i].includes(unit)) {
            convertedUnit =
                (quantity === "1" ?
                 allMeasurements[i][0] :
                 allMeasurements[i][1]);
          break;
        }
      }
    }

    if (convertedUnit == null && unit != null) {
      return { error: "Invalid unit" };
    }
    return { quantity: parseFloat(quantity), unit: convertedUnit };
  }

  handleCheck(event, checked) {
    event.preventDefault();
    let groceryItem = this.props.groceryItem;
    if (checked) {
      groceryItem.purchased = true;
      this.props.updateGroceryItem({ grocery_item: groceryItem });
    } else {
      groceryItem.purchased = false;
      this.props.updateGroceryItem({ grocery_item: groceryItem });
    }
  }

  handleQuantityChange() {
    return e => {
      let parsedUpdateQuantity = this.parseUpdateQuantity(e.target.value);
      if (parsedUpdateQuantity.error != null) {
        this.props.updateQuantityDisplay(this.props.groceryItem.id,
            e.target.value);
        this.setState({ quantityError: parsedUpdateQuantity.error });
      } else {
        this.setState({ quantityError: "" });
        let updatedGroceryItem = merge({}, this.props.groceryItem);
        updatedGroceryItem.currentQuantityDisplay = e.target.value;
        updatedGroceryItem.quantity = parsedUpdateQuantity.quantity;
        updatedGroceryItem.unit = parsedUpdateQuantity.unit;
        this.props.updateGroceryItem({ grocery_item: updatedGroceryItem });
      }
    }
  }

  update(property) {
    return e => {
      if (property === "name") {
        if (e.target.value === "") {
          this.setState({ nameError: "Name cannot be blank" });
          return;
        } else {
          this.setState({ nameError: "" });
        }
      }

      if (property === "category") {
        let groceryItem = this.props.groceryItem;
        if (updateGrocery(
            this.props.groceryItems,
            groceryItem.id,
            groceryItem.name,
            e.target.value,
            groceryItem.unit,
            parseFloat(groceryItem.quantity),
            this.props.updateGroceryItem,
            this.props.deleteGroceryItem)) {
          return;
        }
      };

      let newGroceryItem = merge({}, this.props.groceryItem);
      newGroceryItem[property] = e.target.value;
      this.props.updateGroceryItem({ grocery_item: groceryItem });
    }
  }

  showQuantityError() {
    if (this.state.quantityError === "") {
      return null;
    }
    return (<div className="item-error">{ this.state.quantityError }</div>);
  }

  showNameError() {
    if (this.state.nameError === "") {
      return null;
    }
    if (this.state.quantityError === "") {
      return (<div className="item-name-error2">{ this.state.nameError }</div>);
    }
    return (<div className="item-name-error1">{ this.state.nameError }</div>);
  }

  render() {
    const groceryItem = this.props.groceryItem;
    return (
      <div>
        <div className="update-grocery-form-div">
          <Checkbox className="update-grocery-checkbox"
            style={ styles }
            iconStyle={ icon }
            checked={ groceryItem.purchased ? true : false }
            onCheck={ this.handleCheck } />

          <form className="update-item-form">
            <TextField id="text-field-default"
              value={ groceryItem.currentQuantityDisplay }
              underlineFocusStyle={ underlineFocusStyle }
              underlineStyle={ underlineStyle }
              style={ quantityStyle }
              onChange={ this.handleQuantityChange() }
            />

            <TextField id="text-field-default"
              value={ groceryItem.name }
              underlineFocusStyle={ underlineFocusStyle }
              underlineStyle={ underlineStyle }
              onChange={ this.update("name") }
              style={groceryItem.category === "" ?
                  itemStyleCategory : itemStyleDefault}
            />

            {groceryItem.category === "" ?
              <select className="uncategorized-items"
                  onChange={ this.update("category") }>
                <option selected="true" disabled="disabled">
                    Select a Category
                </option>
                {formCategory.map((category, idx) => {
                  return (
                    <option key={ idx } value={ category }>{ category }</option>
                  )
                })};
              </select> : ""}
          </form>

          <i className="material-icons trash-can"
              style={ styles }
              onClick={ () => this.props.deleteGroceryItem(groceryItem.id) }>
              delete_forever
          </i>
        </div>

        <div className="error-messages">
          { this.showQuantityError() }
          { this.showNameError() }
        </div>
      </div>
    );
  }
}

export default GroceryIndexItem;
