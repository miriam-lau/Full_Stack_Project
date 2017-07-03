import React from 'react';
import { TextField } from 'material-ui';

const addItemStyle = {
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "13px",
  "fontWeight": "bold",
  "width": "330px",
  "display": "inline",
  "marginLeft": "10px",
  "marginRight": "5px",
  "height": "30px"
}

const hintTextStyle = {
  "bottom": "3px",
  "color": "#333399",
  "width": "330px"
}

const selectCategory = ["Baking and Dry Goods", "Beverages", "Bread and Bakery", "Canned and Jarred Goods", "Dairy", "Dried Herbs and Spices", "Frozen Foods", "Fruits and Vegetables", "Meat and Seafood", "Oils and Sauces", "Snacks", "Miscellaneous"];

const teaspoon = ['teaspoon', 'teaspoons', 't', 'tsp'];
const tablespoon = ['tablespoon', 'tablespoons', 'T', 'tbsp'];
const fluidounce = ['fluid ounce', 'fluid ounces', 'fl oz'];
const gill = ['gill', 'gills'];
const cup = ['cup', 'cups', 'c'];
const pint = ['pint', 'pints', 'p', 'pt', 'fl pt'];
const quart = ['quart', 'quarts', 'q', 'qt', 'fl qt'];
const gallon = ['gallon', 'gallons', 'g', 'gal'];
const milliliter = ['milliliter', 'milliliters', 'millilitre', 'millilitres', 'ml', 'cc', 'mL'];
const liter = ['liter', 'liters', 'litre', 'litres', 'L'];
const deciliter = ['deciliter', 'deciliters', 'decilitre', 'decilitres', 'dL'];
const pound = ['pound', 'pounds', 'lb', 'lbs'];
const ounce = ['ounce', 'ounces', 'oz'];
const milligram = ['milligram', 'milligrams', 'milligramme', 'milligrammes', 'mg'];
const gram = ['gram', 'grams', 'gramme', 'grammes', 'g'];
const kilogram = ['kilogram', 'kilograms', 'kilogramme', 'kilogrammes', 'kg', 'kgs'];
const millimeter = ['millimeter', 'millimeters', 'millimetre', 'millimetres', 'mm'];
const centimeter = ['centimeter', 'centimeters', 'centimetre', 'centimetres', 'cm'];
const meter = ['meter', 'meters', 'metre', 'metres', 'm'];
const inch = ['inch', 'inches', 'in'];
const foot = ['foot', 'feet'];

const allMeasurements = [teaspoon, tablespoon, fluidounce, gill, cup,
  pint, quart, gallon, milliliter, liter, deciliter, pound, ounce,
  milligram, gram, kilogram, millimeter, centimeter, meter, inch, foot];

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
    this.state = { category: '', name: '', quantity: 0, unit: '',
      temp: '', errors: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.parseAddItem = this.parseAddItem.bind(this);
  }

  parseAddItem(str) {
    let words = str.split(' ');
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
   	  return this.setState({errors: true});
    }

    words = splitFirstWord.concat(words);
    words = words.filter(function(entry) { return entry.trim() != ''; });
    let quantity = parseFloat(words.shift());
    let unit = words[0];
    let convertedUnit = null;

    if (unit == null || unit.length === 0) {
     return this.setState({errors: true})
    }

    if (unit[unit.length - 1] == '.') {
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
      convertedUnit = '';
    }

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }
    let item = words.join(' ');

    // cross-check with existing items to update if found
    let allItems = this.props.pantry_items;

    for (var i = 0; i < allItems.length; i++) {
      if (allItems[i].category !== this.state.category) {
        continue;
      }

      let itemName = allItems[i].name;
      if (itemName !== item) {
        continue;
      }

      let itemUnit = allItems[i].unit;
      if (itemUnit === 'inch' || itemUnit === 'inches') {
        itemUnit = 'inch';
      } else if (itemUnit === 'foot' || itemUnit === 'feet') {
        itemUnit = 'foot';
      } else if (itemUnit.charAt(itemUnit.length - 1) === 's') {
        itemUnit = itemUnit.substring(0, (itemUnit.length - 1));
      }

      if (convertedUnit === 'inch' || convertedUnit === 'inches') {
        convertedUnit = 'inch';
      } else if (convertedUnit === 'foot' || convertedUnit === 'feet') {
        convertedUnit = 'foot';
      } else if (convertedUnit.charAt(convertedUnit.length - 1) === 's') {
        convertedUnit = convertedUnit.substring(0, (convertedUnit.length - 1));
      }

      if (convertedUnit !== itemUnit) {
        continue;
      } else {
        quantity += parseFloat(allItems[i].quantity);
      }

      if (quantity > 1 && convertedUnit !== '') {
        if (convertedUnit === 'inch') {
          convertedUnit = 'inches';
        } else if (convertedUnit === 'foot') {
          convertedUnit = 'feet';
        } else {
          convertedUnit += 's';
        }
      }

      // how to pass in an argument in a fat arrow function (allItems[i].id)
      // this.setState({name: item, category: allItems[i].category, quantity:
      //   quantity, unit: convertedUnit, temp: '', errors: false}, () => {
      //     let pantry_item = {id: allItems[i].id, name: this.state.name, category: this.state.category, quantity: this.state.quantity, unit: this.state.unit};
      //
      //     this.props.editPantryItem({pantry_item});
      //     return true;
      //   });

      let pantry_item = {id: allItems[i].id, name: item, category: allItems[i].category, quantity: quantity, unit: convertedUnit};

      this.props.editPantryItem({pantry_item});
      return true;
    }

    // add new item
    this.setState({name: item, category: this.state.category, quantity: parseFloat(quantity), unit: convertedUnit, temp: '', errors: false}, () => {
        const pantry_item = this.state
        this.props.createNewPantryItem({pantry_item})
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
        this.setState({ [property]: selectCategory[parseInt(e.target.value)] });
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
            onChange={this.update('temp')}
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
