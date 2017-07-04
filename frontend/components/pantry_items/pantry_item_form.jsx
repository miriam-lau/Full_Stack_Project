import React from "react";

import updatePantry from "./update_pantry";
import { allMeasurements } from "../utils/measurements";
import { formCategory } from "../utils/item_categories";
import { addItemStyle, hintTextStyle } from "../utils/material_ui_styles";
import { TextField } from "material-ui";


function ErrorBanner(props) {
  if (props.shouldShow) {
    return (
      <div className="pantry-item-error">{ props.message }</div>
    );
  } else {
    return null;
  }
}

class PantryItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: "", name: "", quantity: 0, unit: "",
      temp: "", errors: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.parseAddItem = this.parseAddItem.bind(this);
  }

  parseAddItem(str) {
    let words = str.split(" ");
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
   	  return this.setState({errors: true});
    }

    words = splitFirstWord.concat(words);
    words = words.filter(function(entry) { return entry.trim() != ""; });
    let quantity = parseFloat(words.shift());
    let unit = words[0];
    let convertedUnit = null;

    if (unit == null || unit.length === 0) {
     return this.setState({errors: true})
    }

    if (unit[unit.length - 1] == ".") {
    unit = unit.substring(0, unit.length - 1);
    }

    for (let i = 0; i < allMeasurements.length; i++) {
      if (allMeasurements[i].includes(unit)) {
        convertedUnit = (quantity === 1 ? allMeasurements[i][0] : allMeasurements[i][1]);
        break;
      }
    }

    if (convertedUnit != null) {
      words.shift();
    }

    if (words.length == 0) {
     return this.setState({errors: true});
    }

    if (convertedUnit === null) {
      convertedUnit = "";
    }

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }
    let item = words.join(" ");

    // cross-check with existing items to update if found
    let id = -1;
    let successful = updatePantry(this.props.pantryItems, id, item,
      this.state.category, convertedUnit, quantity, this.props.updatePantryItem, this.props.deletePantryItem);

    if (successful) {
      return true;
    }

    // add new item
    this.setState({name: item, category: this.state.category, quantity: parseFloat(quantity), unit: convertedUnit, temp: "", errors: false}, () => {
        const pantryItem = this.state
        this.props.createPantryItem({pantry_item: pantryItem})
            .then(data => this.props.history.push(`/pantry_items/${data.id}`))
        });

    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.parseAddItem(this.state.temp);
  }

  update (property) {
    return e => {
      if (property === "category") {
        this.setState({ [property]: formCategory[parseInt(e.target.value)] });
      } else {
        this.setState({ [property]: e.target.value });
      }
    }
  }

  render() {
    return (
      <form className="pantry-form" onSubmit={this.handleSubmit}>
        <div className="pantry-form-fields">
          <TextField id="text-field-default"
            value={this.state.temp}
            underlineShow={false}
            style={addItemStyle}
            hintText="Add an Item,  e.g. '2 Oranges' or '3 cups Milk'"
            hintStyle={hintTextStyle}
            onChange={this.update("temp")}
          />

          <select className="pantry-categories"
            onChange={this.update("category")}>
            <option selected="true" disabled="disabled">Select a Category</option>
            <option value="0">Baking and Dry Goods</option>
            <option value="1">Beverages</option>
            <option value="2">Bread and Bakery</option>
            <option value="3">Canned and Jarred Goods</option>
            <option value="4">Dairy</option>
            <option value="5">Dried Herbs and Spices</option>
            <option value="6">Frozen Foods</option>
            <option value="7">Fruits and Vegetables</option>
            <option value="8">Meat and Seafood</option>
            <option value="9">Oils and Sauces</option>
            <option value="10">Snacks</option>
            <option value="11">Miscellaneous</option>
          </select>

          <i className="fa fa-plus-circle fa-lg" aria-hidden="true"
          onClick={this.handleSubmit}></i>
        </div>
        <ErrorBanner shouldShow={this.state.errors}
        message="Invalid entry. Entry must have 'quantity' and 'item name'" />
      </form>
    );
  }
}

export default PantryItemForm;
