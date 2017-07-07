import React from "react";
import { Link } from "react-router-dom";
import merge from "lodash/merge";

import { findMatchingItem, generateDisplayQuantity, parseUpdateQuantity,
    pluralizeUnit, singularizeUnit } from "../utils/item_helpers";
import { Checkbox, TextField } from "material-ui";
import { formCategory } from "../utils/item_categories";
import { underlineFocusStyle, underlineStyle, quantityStyle, itemStyleDefault,
    itemStyleCategory, icon, styles } from "../utils/material_ui_styles";

class GroceryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantityError: "", nameError: "" };
    this.showQuantityError = this.showQuantityError.bind(this);
    this.showNameError = this.showNameError.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(event, checked) {
    event.preventDefault();
    let groceryItem = this.props.groceryItem;
    groceryItem.purchased = checked ? true : false;
    this.props.updateGroceryItem({ grocery_item: groceryItem });
  }

  /*
   Handles quantity and unit changes and sets the state if there is an error, otherwise it updates the pantry item.
  */
  handleQuantityChange() {
    return e => {
      let parsedUpdateQuantity = parseUpdateQuantity(e.target.value);
      if (parsedUpdateQuantity.error != null) {
        this.props.updateGroceryQuantityDisplay(
            this.props.groceryItem.id, e.target.value);
        this.setState({ quantityError: parsedUpdateQuantity.error });
      } else {
        let updatedGroceryItem = merge({}, this.props.groceryItem);
        updatedGroceryItem.currentQuantityDisplay = e.target.value;
        updatedGroceryItem.quantity = parsedUpdateQuantity.quantity;
        updatedGroceryItem.unit = parsedUpdateQuantity.unit;
        this.props.updateGroceryItem({ grocery_item: updatedGroceryItem });
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
        let item = this.props.groceryItem;
        groceryItem.category = e.target.value;

        // check for duplicate items
        let duplicateItem = findMatchingItem(this.props.groceryItems,
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

          this.props.updateGroceryItem({ grocery_item: updateDuplicateItem })
              .then(() => this.props.deleteGroceryItem(item.id));
          return;
        }
      };

      let updateGroceryItem = merge({}, this.props.groceryItem);
      updateGroceryItem[property] = e.target.value;
      this.props.updateGroceryItem({ grocery_item: updateGroceryItem });
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
    let errorClass = this.state.quantityError === "" ?
        "item-name-error2" : "item-name-error1";
    return (<div className={ errorClass }>{ this.state.nameError }</div>);
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

        <div className="item-error-messages">
          { this.showQuantityError() }
          { this.showNameError() }
        </div>
      </div>
    );
  }
}

export default GroceryIndexItem;
