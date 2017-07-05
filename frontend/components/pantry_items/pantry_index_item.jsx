import React from "react";
import { Link } from "react-router-dom";
import merge from "lodash/merge";

import updatePantry from "./update_pantry";
import { allMeasurements } from "../utils/measurements";
import { formCategory } from "../utils/item_categories";
import { FontIcon, TextField } from "material-ui/";
import { underlineStyle, underlineFocusStyle, quantityStyle, itemStyleDefault,
    itemStyleCategory, styles } from "../utils/material_ui_styles";

class PantryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantityError: "", nameError: "" };

    this.parseUpdateQuantity = this.parseUpdateQuantity.bind(this);
    this.showQuantityError = this.showQuantityError.bind(this);
    this.showNameError = this.showNameError.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  parseUpdateQuantity(str) {
    let words = str.split(" ");
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
      return { error: "Quantity must be a number" };
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

  // TODO: write what function does
  handleQuantityChange() {
    return e => {
      let parsedUpdateQuantity = this.parseUpdateQuantity(e.target.value);
      if (parsedUpdateQuantity.error != null) {
        this.props.updateQuantityDisplay(this.props.pantryItem.id,
            e.target.value);
        this.setState({ quantityError: parsedUpdateQuantity.error });
      } else {
        this.setState({ quantityError: "" });
        let updatedPantryItem = merge({}, this.props.pantryItem);
        updatedPantryItem.currentQuantityDisplay = e.target.value;
        updatedPantryItem.quantity = parsedUpdateQuantity.quantity;
        updatedPantryItem.unit = parsedUpdateQuantity.unit;
        this.props.updatePantryItem({ pantry_item: updatedPantryItem });
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
        let pantryItem = this.props.pantryItem;
        if (updatePantry(
            this.props.pantryItems,
            pantryItem.id,
            pantryItem.name,
            e.target.value,
            pantryItem.unit,
            parseFloat(pantryItem.quantity),
            this.props.updatePantryItem,
            this.props.deletePantryItem)) {
          return;
        }
      };

      let newPantryItem = merge({}, this.props.pantryItem);
      newPantryItem[property] = e.target.value;
      this.props.updatePantryItem({ pantry_item: newPantryItem });
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
    const pantryItem = this.props.pantryItem;
    return (
      <div>
        <div className="update-pantry-form-div">
          <form className="update-item-form">
            <TextField id="text-field-default"
              value={ pantryItem.currentQuantityDisplay }
              underlineFocusStyle={ underlineFocusStyle }
              underlineStyle={ underlineStyle }
              style={ quantityStyle }
              onChange={ this.handleQuantityChange() }
            />

            <TextField id="text-field-default"
              value={ pantryItem.name }
              underlineFocusStyle={ underlineFocusStyle }
              underlineStyle={ underlineStyle }
              onChange={ this.update("name") }
              style={pantryItem.category === "" ?
                  itemStyleCategory : itemStyleDefault}
            />

            {pantryItem.category === "" ?
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
              style={styles}
              onClick={ () => this.props.deletePantryItem(pantryItem.id) }>
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

export default PantryIndexItem;
