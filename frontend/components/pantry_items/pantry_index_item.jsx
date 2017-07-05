import React from "react";
import { Link } from "react-router-dom";
import merge from "lodash/merge";

import checkDuplicateItems from "../utils/check_duplicate_items";
import parseUpdateQuantity from "../utils/parse_update_quantity";
import { pluralizeUnit, singularizeUnit } from "../utils/set_unit";
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

  // TODO: write what function does
  handleQuantityChange() {
    return e => {
      let parsedUpdateQuantity = parseUpdateQuantity(e.target.value);
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
        pantryItem.category = e.target.value;

        // check for duplicate items
        let duplicateItem = checkDuplicateItems(this.props.pantryItems,
            pantryItem.id, pantryItem);

        if (duplicateItem != null) {
          let quantity = parseFloat(pantryItem.quantity) +
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

          this.props.updatePantryItem({ pantry_item: updateDuplicateItem })
              .then(() => this.props.deletePantryItem(pantryItem.id));
          return;
        }
      };

      let updatePantryItem = merge({}, this.props.pantryItem);
      updatePantryItem[property] = e.target.value;
      this.props.updatePantryItem({ pantry_item: updatePantryItem });
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
