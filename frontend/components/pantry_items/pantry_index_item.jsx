import React from "react";
import { Link } from "react-router-dom";

import merge from "lodash/merge";
import { findMatchingItem, generateDisplayQuantity, parseUpdateQuantity,
    pluralizeUnit, singularizeUnit } from "../utils/item_helpers";
import { formCategory } from "../utils/item_categories";
import { FontIcon, TextField } from "material-ui/";
import { underlineStyle, underlineFocusStyle, quantityStyle, itemStyleDefault,
    itemStyleCategory, styles } from "../utils/material_ui_styles";

class PantryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantityError: "", nameError: "" };
    this.showQuantityError = this.showQuantityError.bind(this);
    this.showNameError = this.showNameError.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  /*
   Handles quantity and unit changes and sets the state if there is an error, otherwise it updates the pantry item.
  */
  handleQuantityChange() {
    return e => {
      let parsedUpdateQuantity = parseUpdateQuantity(e.target.value);
      if (parsedUpdateQuantity.error != null) {
        this.props.updateQuantityDisplay(
            this.props.pantryItem.id, e.target.value);
        this.setState({ quantityError: parsedUpdateQuantity.error });
      } else {
        let updatedPantryItem = merge({}, this.props.pantryItem);
        updatedPantryItem.currentQuantityDisplay = e.target.value;
        updatedPantryItem.quantity = parsedUpdateQuantity.quantity;
        updatedPantryItem.unit = parsedUpdateQuantity.unit;

        this.props.updatePantryItem({ pantry_item: updatedPantryItem });
        this.setState({ quantityError: "" });
      }
    }
  }

  /*
    On changes to item fields, it will update the corresponding property, then either combine with a duplicate item (if found) or update the item.
    @param {property} property of the item
  */
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
        let item = this.props.pantryItem;
        item.category = e.target.value;

        // check for duplicate items
        let duplicateItem = findMatchingItem(this.props.pantryItems,
            item.id, item);

        if (duplicateItem != null) {
          let quantity = parseFloat(item.quantity) +
              parseFloat(duplicateItem.quantity);

          let itemUnit = quantity > 1 ?
              pluralizeUnit(duplicateItem.unit) :
              singularizeUnit(duplicateItem.unit);

          // set the currentQuantityDisplay
          let currentQuantityDisplay = generateDisplayQuantity(item);

          let updateDuplicateItem = {
            id: duplicateItem.id,
            name: duplicateItem.name,
            category: duplicateItem.category,
            quantity: quantity,
            unit: itemUnit,
            currentQuantityDisplay: currentQuantityDisplay
          };

          this.props.updatePantryItem({ pantry_item: updateDuplicateItem })
              .then(() => this.props.deletePantryItem(item.id));
          return;
        }
      };

      let updatePantryItem = merge({}, this.props.pantryItem);
      updatePantryItem[property] = e.target.value;
      this.props.updatePantryItem({ pantry_item: updatePantryItem });
    }
  }

  /*
    Checks if there is a quantity error.
    @return {string} error string or null
  */
  showQuantityError() {
    if (this.state.quantityError === "") {
      return null;
    }
    return (<div className="item-error">{ this.state.quantityError }</div>);
  }

  /*
    Checks if there is a name error.
    @return {string} error string or null
  */
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
        <div className="update-item-form-div">

          <div className="checkbox-placeholder"></div>

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
              style={ styles }
              onClick={ () => this.props.deletePantryItem(pantryItem.id) }>
            delete_forever
          </i>
        </div>

        <div className="item-error-messages">
          { this.showQuantityError() }
          { this.showNameError() }
        </div>
      </div>
    );
  }
}

export default PantryIndexItem;
