import React from "react";
import { Link } from "react-router-dom";

import { allMeasurements } from "../utils/measurements";
import { Checkbox, TextField } from "material-ui";
import { formCategory } from "../utils/item_categories";
import { underlineFocusStyle, underlineStyle, quantityStyle, itemStyleDefault,
  itemStyleCategory, icon, styles } from "../utils/material_ui_styles";

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
    let groceryItem = this.props.groceryItem;
    this.state = { id: groceryItem.id, user_id: groceryItem.user_id,
      purchased: groceryItem.purchased, category: groceryItem.category, temp: "", quantityError: "", nameError: "" };

    this.parseUpdateQuantity = this.parseUpdateQuantity.bind(this);
    this.checkError = this.checkError.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.update = this.update.bind(this);
    this.currentQuantity = this.props.groceryItem.quantity;

    if (groceryItem.unit != null && groceryItem.unit.length !== 0) {
      this.currentQuantity = this.currentQuantity + " " + groceryItem.unit;
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
        const groceryItem = this.state
        this.props.updateGroceryItem({grocery_item: groceryItem});
      });

    return null;
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
          const groceryItem = this.state;
          this.props.updateGroceryItem({grocery_item: groceryItem});
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
    const groceryItem = this.props.groceryItem;
    const deleteGroceryItem = this.props.deleteGroceryItem;

    let quantity = groceryItem.quantity;
    if (groceryItem.unit !== null) {
      quantity = quantity + " " + groceryItem.unit;
    }

    return (
      <div>
        <div className="update-grocery-form-div">
          <Checkbox className="update-grocery-checkbox"
            style={styles}
            iconStyle={icon}
            checked={this.state.purchased ? true : false} onCheck={this.handleCheck} />

          <form className="update-grocery-form">
            <TextField id="text-field-default"
              defaultValue={ quantity }
              underlineFocusStyle={underlineFocusStyle}
              underlineStyle={underlineStyle}
              style={quantityStyle}
              onChange={this.update("temp")}
              onBlur={this.checkError}
            />

            {groceryItem.category === "" ?
              <TextField id="text-field-default"
                defaultValue={ groceryItem.name }
                underlineFocusStyle={underlineFocusStyle}
                underlineStyle={underlineStyle}
                style={itemStyleCategory}
                onChange={this.update("name")}
              /> :
              <TextField id="text-field-default"
                defaultValue={ groceryItem.name }
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
            delete_forever</i>
        </div>

        <ErrorBanner1 message={this.state.quantityError} />
        <ErrorBanner2 message={this.state.nameError} />
      </div>
    );
  }
}

export default GroceryIndexItem;
