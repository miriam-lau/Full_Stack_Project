import React from 'react';
import TextField from 'material-ui/TextField';

const addItemTextBoxStyle ={
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "13px",
  "fontWeight": "bold",
  "width": "490px",
  "display": "inline",
  "marginLeft": "20px",
  "marginRight": "20px",
  "height": "30px"
}

const hintTextStyle = {
  "bottom": "2px",
  "color": "#333399"
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
      <div className="grocery-item-error">
        { props.message }
      </div>
    );
  } else {
    return null;
  }
}

class GroceryItemForm extends React.Component {
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
      convertedUnit = '';
    }
    let item = words.join(' ');

    this.setState({name: item, quantity: parseInt(quantity),
      unit: convertedUnit, temp: '', errors: false}, () => {
        const grocery_item = this.state
        this.props.createGroceryItem({grocery_item})
            .then(data => this.props.history.push(`/groceries/${data.id}`))
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
      <form className="grocery-form" onSubmit={this.handleSubmit}>
        <div className="grocery-form-fields">
          <TextField id="text-field-default"
            value={this.state.temp}
            underlineShow={false}
            style={addItemTextBoxStyle}
            hintText="Add an Item,  e.g. '2 Oranges' or '3 cups Milk'"
            hintStyle={hintTextStyle}
            onChange={this.update('temp')}
          />

          <i className="fa fa-plus-circle fa-lg" aria-hidden="true"
          onClick={this.handleSubmit}></i>
        </div>
        <ErrorBanner shouldShow={this.state.errors}
        message="Invalid entry. Entry must have 'quantity' and 'item name'" />
      </form>
    );
  }
}

export default GroceryItemForm;
