import React from "react";
import { Link } from "react-router-dom";
import merge from "lodash/merge";

import { findMatchingItem, parseUpdateQuantity, pluralizeUnit,
    singularizeUnit } from "../utils/item_helpers";
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
      let parsedUpdateQuantity = parseUpdateQuantity(e.target.value);
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
        groceryItem.category = e.target.value;

        // check for duplicate items
        let duplicateItem = findMatchingItem(this.props.groceryItems,
            groceryItem.id, groceryItem);

        if (duplicateItem != null) {
          let quantity = parseFloat(groceryItem.quantity) +
              parseFloat(duplicateItem.quantity);
          let itemUnit = singularizeUnit(duplicateItem.unit);

          if (quantity > 1 && itemUnit !== "") {
            itemUnit = pluralizeUnit(itemUnit);
          }

          // set the currentQuantityDisplay
          let currentQuantityDisplay = quantity;
          if (itemUnit !== "") {
            currentQuantityDisplay += " " + itemUnit;
          }

          let updateDuplicateItem = {
            id: duplicateItem.id,
            name: duplicateItem.name,
            category: duplicateItem.category,
            quantity: quantity,
            unit: itemUnit,
            currentQuantityDisplay: currentQuantityDisplay
          };

          this.props.updateGroceryItem({ grocery_item: updateDuplicateItem })
              .then(() => this.props.deleteGroceryItem(groceryItem.id));
          return;
        }
      };

      let newGroceryItem = merge({}, this.props.groceryItem);
      updateGroceryItem[property] = e.target.value;
      this.props.updateGroceryItem({ grocery_item: updateGroceryItem });
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
