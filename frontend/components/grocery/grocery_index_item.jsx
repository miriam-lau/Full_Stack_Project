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
    let groceryItem = this.props.groceryItem;
    this.state = { id: groceryItem.id, user_id: groceryItem.user_id,
      purchased: groceryItem.purchased, name: groceryItem.name, category: groceryItem.category, quantity: groceryItem.quantity, unit: groceryItem.unit, quantityError: "", nameError: "" };

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
      return {error: "Invalid unit"};
    }
    return {quantity: parseFloat(quantity), unit: convertedUnit};
  }

  handleCheck(event, checked) {
    event.preventDefault();
    if (checked) {
      this.setState({purchased: true}, () => {
        const groceryItem = this.state;
        this.props.updateGroceryItem({grocery_item: groceryItem});
      })
    } else {
      this.setState({purchased: false}, () => {
        const groceryItem = this.state;
        this.props.updateGroceryItem({grocery_item: groceryItem});
      })
    }
  }

  handleQuantityChange() {
    return e => {
      let parsedUpdateQuantity = this.parseUpdateQuantity(e.target.value);
      if (parsedUpdateQuantity.error != null) {
        this.props.updateQuantityDisplay(this.props.groceryItem.id,
            e.target.value);
        this.setState({quantityError: parsedUpdateQuantity.error});
      } else {
        this.setState({quantityError: ""});
        let updatedGroceryItem = merge({}, this.props.groceryItem);
        updatedGroceryItem.currentQuantityDisplay = e.target.value;
        updatedGroceryItem.quantity = parsedUpdateQuantity.quantity;
        updatedGroceryItem.unit = parsedUpdateQuantity.unit;
        this.props.updateGroceryItem({grocery_item: updatedGroceryItem});
      }
    }
  }

  update(property) {
    return e => {
      if (property === "name") {
        if (e.target.value === "") {
          return this.setState({nameError: "Name cannot be blank"});
        } else {
          this.setState({nameError: ""});
        }
      }

      if (property === "purchased") {
        this.setState({purchased: true});
      }

      if (property === "category") {
        this.setState({ [property]: e.target.value }, () => {
          let successful = updateGrocery(this.props.groceryItems,
              this.state.id, this.state.name, this.state.category, this.state.unit, parseFloat(this.state.quantity), this.props.updateGroceryItem, this.props.deleteGroceryItem);
          if (successful) {
            return true;
          }
        });
      }

      let currentQuantityDisplay = this.state.quantity;
      if (this.state.unit != null) {
        currentQuantityDisplay += " " + this.state.unit;
      }
      this.setState({[property]: e.target.value,
            currentQuantityDisplay: currentQuantityDisplay}, () => {
          const groceryItem = this.state;
          console.log(this.state);
        this.props.updateGroceryItem({grocery_item: groceryItem});
      });
    }
  }

  showQuantityError(message) {
    if (message != "") {
      return (<div className="pantry-item-error">{ message }</div>);
    }
    return null;
  }

  showNameError(message) {
    if (message != "" && this.state.quantityError === "") {
      return (<div className="pantry-item-name-error-only">{ message }</div>);
    }
    if (message != "") {
      return (<div className="pantry-item-name-error">{ message }</div>);
    }
    return null;
  }

  render() {
    const groceryItem = this.props.groceryItem;
    const deleteGroceryItem = this.props.deleteGroceryItem;

    return (
      <div>
        <div className="update-grocery-form-div">
          <Checkbox className="update-grocery-checkbox"
            style={styles}
            iconStyle={icon}
            checked={this.state.purchased ? true : false} onCheck={this.handleCheck} />

          <form className="update-grocery-form">
            <TextField id="text-field-default"
              value={ groceryItem.currentQuantityDisplay }
              underlineFocusStyle={underlineFocusStyle}
              underlineStyle={underlineStyle}
              style={quantityStyle}
              onChange={this.handleQuantityChange()}
            />

            {groceryItem.category === "" ?
              <TextField id="text-field-default"
                value={ groceryItem.name }
                underlineFocusStyle={underlineFocusStyle}
                underlineStyle={underlineStyle}
                style={itemStyleCategory}
                onChange={this.update("name")}
              /> :
              <TextField id="text-field-default"
                value={ groceryItem.name }
                underlineFocusStyle={underlineFocusStyle}
                underlineStyle={underlineStyle}
                style={itemStyleDefault}
                onChange={this.update("name")}
              />
            }

            {groceryItem.category === "" ?
              <select className="grocery-uncategorized"
                onChange={this.update("category")}>
                <option selected="true" disabled="disabled">
                    Select a Category</option>
                {formCategory.map((category, idx) => {
                  return(
                    <option key={idx} value={category}>{category}</option>
                  )
                })};
              </select> : ""}
          </form>

          <i className="material-icons trash-can"
            style={styles}
            onClick={() => deleteGroceryItem(groceryItem.id)}>
            delete_forever
          </i>
        </div>

        <div className="error-messages">
          {this.showQuantityError(this.state.quantityError)}
          {this.showNameError(this.state.nameError)}
        </div>
      </div>
    );
  }
}

export default GroceryIndexItem;
