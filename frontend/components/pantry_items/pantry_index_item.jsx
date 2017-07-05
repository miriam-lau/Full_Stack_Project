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
    let pantryItem = this.props.pantryItem;
    this.state = { id: pantryItem.id, user_id: pantryItem.user_id,
      name: pantryItem.name, category: pantryItem.category, quantity: pantryItem.quantity, unit: pantryItem.unit, quantityError: "", nameError: ""};

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
      return {error: "Quantity must be a number"};
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

  handleQuantityChange() {
    return e => {
      let parsedUpdateQuantity = this.parseUpdateQuantity(e.target.value);
      if (parsedUpdateQuantity.error != null) {
        this.props.updateQuantityDisplay(this.props.pantryItem.id,
            e.target.value);
        this.setState({quantityError: parsedUpdateQuantity.error});
      } else {
        this.setState({quantityError: ""});
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
          return this.setState({nameError: "Name cannot be blank"});
        } else {
          this.setState({nameError: ""});
        }
      }

//Only for existing uncategorized items; returns true if update is successful
//pantryItems = array; name, category, unit = strings; quantity: float;
      if (property === "category") {
        this.setState({ [property]: e.target.value }, () => {
          let successful = updatePantry(this.props.pantryItems,
              this.state.id, this.state.name, this.state.category, this.state.unit, parseFloat(this.state.quantity), this.props.updatePantryItem, this.props.deletePantryItem);
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
        const pantryItem = this.state;
        this.props.updatePantryItem({pantry_item: pantryItem});
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
    const pantryItem = this.props.pantryItem;
    const deletePantryItem = this.props.deletePantryItem;

    return (
      <div>
        <div className="update-pantry-form-div">
          <form className="update-pantry-form">
            <TextField id="text-field-default"
              value={ pantryItem.currentQuantityDisplay }
              underlineFocusStyle ={underlineFocusStyle} underlineStyle={underlineStyle}
              style={quantityStyle}
              onChange={this.handleQuantityChange()}
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
            onClick={() => deletePantryItem(pantryItem.id)}>
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

export default PantryIndexItem;
