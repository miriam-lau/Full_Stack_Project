import React from "react";
import { Link } from "react-router-dom";

import { allMeasurements } from "../utils/measurements";
import { Checkbox, TextField } from "material-ui";
import { underlineFocusStyle, underlineStyle, quantityStyle, itemStyleDefault, itemStyleCategory, icon, styles } from "../utils/material_ui_styles";

function ErrorBanner1(props) {
  if (props.message != null) {
    return (
      <div className="grocery-item-error">{ props.message }</div>
    );
  } else {
    return null;
  }
}

function ErrorBanner2(props) {
  if (props.message != null) {
    return (
      <div className="grocery-item-error">{ props.message }</div>
    );
  } else {
    return null;
  }
}

class GroceryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    let grocery_item = this.props.grocery_item;
    this.state = { id: grocery_item.id, user_id: grocery_item.user_id,
      purchased: grocery_item.purchased, category: grocery_item.category, temp: "", quantityError: "", nameError: "" };

    this.parseUpdateQuantity = this.parseUpdateQuantity.bind(this);
    this.checkError = this.checkError.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.update = this.update.bind(this);
    this.currentQuantity = this.props.grocery_item.quantity;

    if (grocery_item.unit != null && grocery_item.unit.length !== 0) {
      this.currentQuantity = this.currentQuantity + " " + grocery_item.unit;
    }
  }

  parseUpdateQuantity(str) {
    let words = str.split(" ");
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
      return "Quantity must begin with a number";
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
      return "Quantity must have a valid unit";
    }

    this.setState({quantity: parseInt(quantity), unit: convertedUnit,
      temp: "", quantityError: ""}, () => {
        const grocery_item = this.state
        this.props.editGroceryItem({grocery_item});
      });

    return null;
  }

  handleCheck(event, checked) {
    event.preventDefault();
    if (checked) {
      this.setState({purchased: true}, () => {
        const grocery_item = this.state;
        this.props.editGroceryItem({grocery_item});
      })
    } else {
      this.setState({purchased: false}, () => {
        const grocery_item = this.state;
        this.props.editGroceryItem({grocery_item});
      })
    }
  }

  update(property) {
    return e => {
      if (property === "temp") {
        this.currentQuantity = e.target.value;
      }

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
        this.setState({ [property]: e.target.value });
      }

      this.setState({[property]: e.target.value}, () => {
        if (this.state.temp === "") {
          const grocery_item = this.state;
          this.props.editGroceryItem({grocery_item});
        } else {
          this.parseUpdateQuantity(this.state.temp);
        }
      });
    }
  }

  checkError() {
    let errorMessage = this.parseUpdateQuantity(this.currentQuantity);
    if (errorMessage != null) {
      this.setState({quantityError: errorMessage});
    }
  }

  render() {
    const grocery_item = this.props.grocery_item;
    const removeGroceryItem = this.props.removeGroceryItem;
    let quantity = grocery_item.quantity;
    if (grocery_item.unit !== null) {
      quantity = quantity + " " + grocery_item.unit;
    }

    return (
      <div>
        <div className="update-grocery-form-div">

          <Checkbox className="update-grocery-checkbox"
            style={styles}
            iconStyle={icon}
            checked={this.state.purchased ? true : false}
            onCheck={this.handleCheck}
            />

          <form className="update-grocery-form">
            <TextField id="text-field-default"
              defaultValue={ quantity }
              underlineFocusStyle={underlineFocusStyle}
              underlineStyle={underlineStyle}
              style={quantityStyle}
              onChange={this.update("temp")}
              onBlur={this.checkError}
            />

            {grocery_item.category === "" ?
              <TextField id="text-field-default"
                defaultValue={ grocery_item.name }
                underlineFocusStyle={underlineFocusStyle}
                underlineStyle={underlineStyle}
                style={itemStyleCategory}
                onChange={this.update("name")}
              /> :
              <TextField id="text-field-default"
                defaultValue={ grocery_item.name }
                underlineFocusStyle={underlineFocusStyle}
                underlineStyle={underlineStyle}
                style={itemStyleDefault}
                onChange={this.update("name")}
              />
            }

            {grocery_item.category === "" ?
              <select className="grocery-uncategorized"
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
            onClick={() => removeGroceryItem(grocery_item.id)}>
            delete_forever</i>
        </div>

        <ErrorBanner1 message={this.state.quantityError} />
        <ErrorBanner2 message={this.state.nameError} />
      </div>
    );
  }
}

export default GroceryIndexItem;
