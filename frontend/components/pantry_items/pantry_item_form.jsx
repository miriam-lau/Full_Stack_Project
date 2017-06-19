import React from 'react';

import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

const textboxUnderlineStyle = {
  "borderColor": "#333399",
}

const addItemTextBoxStyle ={
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "14px",
  "fontWeight": "bold",
  "width": "520px",
  "display": "inline",
  "marginLeft": "20px",
  "marginRight": "20px"
}

const teaspoon = ['teaspoon', 'teaspoons', 't', 'tsp'];
const tablespoon = ['tablespoon', 'tablespoons', 'T', 'tbl', 'tbs', 'tbsp'];
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
const inch = ['inch', 'inches', 'in', '"'];
const foot = ['foot', 'feet', '\''];

const allMeasurements = [teaspoon, tablespoon, fluidounce, gill, cup,
  pint, quart, gallon, milliliter, liter, deciliter, pound, ounce,
  milligram, gram, kilogram, millimeter, centimeter, meter, inch, foot];

function ErrorBanner(props) {
  if (props.shouldShow) {
    return (
      <div className="pantry-item-error">
        { props.message }
      </div>
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
    let quantity = words.shift();
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
        convertedUnit = (quantity === '1' ? allMeasurements[i][0] : allMeasurements[i][1]);
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
      convertedUnit = '';n
    }
    let item = words.join(' ');

    let items = this.props.pantry_items;
    this.setState({name: item, quantity: parseFloat(quantity),
      unit: convertedUnit, temp: '', errors: false}, () => {
        let current_pantry_item = this.state;
        let pantry_itemUnit = current_pantry_item.unit.toLowerCase();
        if (pantry_itemUnit.charAt(pantry_itemUnit.length - 1) === 's') {
          pantry_itemUnit = pantry_itemUnit.substring(0, (pantry_itemUnit.length - 1))
        }

        let items = this.props.pantry_items;
        for (var i = 0; i < items.length; i++) {
          let itemName = items[i].name.toLowerCase();
          let itemUnit = items[i].unit.toLowerCase();
          if (itemUnit.charAt(itemUnit.length - 1) === 's') {
            itemUnit = itemUnit.substring(0, (itemUnit.length - 1))
          }
          let newUnit;
          if (current_pantry_item.name.toLowerCase() === itemName) {
            itemName = itemName[0].toUpperCase() + itemName.substring(1);
            if (pantry_itemUnit === itemUnit) {
              if (pantry_itemUnit === "") {
                newUnit = "";
              } else {
                newUnit = itemUnit;
              }
              let newQuantity = parseFloat(items[i].quantity) + parseFloat(current_pantry_item.quantity);
              if (newQuantity > 1 && newUnit !== "") {
                newUnit += 's';
              }
              let unparsed_quantity = newQuantity + (newUnit != '' ? (' ' + newUnit) : '');
              let pantry_item = {id: items[i].id, name: itemName, quantity: newQuantity, unit: newUnit, 'unparsed_quantity': unparsed_quantity};
              this.props.editPantryItemDbOnly({pantry_item});
              return true;
            }
          }
        }

        this.props.createPantryItem({'pantry_item': current_pantry_item});
      });
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.parseAddItem(this.state.temp);
  }

  update (property) {
    return e => this.setState({[property]: e.target.value});
  }

  render() {
    return (
      <form className="pantry-form" onSubmit={this.handleSubmit}>
        <div className="pantry-form-fields">
          <TextField id="text-field-default"
            value={this.state.temp}
            underlineFocusStyle ={textboxUnderlineStyle}
            style={addItemTextBoxStyle}
            hintText="e.g. '2 Oranges' or '3 cups Milk'"
            onChange={this.update('temp')}
          />

          <i className="material-icons"
          onClick={this.handleSubmit}>add_circle</i>
        </div>
        <ErrorBanner shouldShow={this.state.errors}
        message="Invalid entry. Entry must have 'quantity' and 'item name'" />
      </form>
    );
  }
}

export default PantryItemForm;
