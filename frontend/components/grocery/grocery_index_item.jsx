import React from 'react';
import TextField from 'material-ui/TextField';

import { Link } from 'react-router-dom';

const textboxUnderlineStyle = {
  'borderColor': '#333399'
}

const addItemTextBoxStyle1 = {
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "22px",
  "fontWeight": "bold",
  "width": "35%",
  "display": "inline",
  "textAlign": "left",
  "marginRight": "50px",
  "marginLeft": "20px"
}

const addItemTextBoxStyle2 = {
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "22px",
  "fontWeight": "bold",
  "width": "65%",
  "display": "inline"
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

function ErrorBanner1(props) {
  if (props.message != null) {
    return (
      <div className="grocery-item-error">
        { props.message }
      </div>
    );
  } else {
    return null;
  }
}

function ErrorBanner2(props) {
  if (props.message != null) {
    return (
      <div className="grocery-item-error">
        { props.message }
      </div>
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
      temp: '', quantityError: '', nameError: '' };
    this.parseUpdateQuantity = this.parseUpdateQuantity.bind(this);
    this.checkError = this.checkError.bind(this);
    this.currentQuantity = this.props.grocery_item.quantity;
    if (grocery_item.unit != null && grocery_item.unit.length !== 0) {
      this.currentQuantity = this.currentQuantity + " " + grocery_item.unit;
    }
  }

  parseUpdateQuantity(str) {
    let words = str.split(' ');
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
      return "Quantity must begin with a number";
    }

    words = splitFirstWord.concat(words);
    words = words.filter(function(el) {
      return (el.trim() !== '');
    });

    let quantity = words.shift();
    let unit = words[0];
    let convertedUnit = null;

    if (unit != null) {
      if (unit[unit.length - 1] == '.') {
        unit = unit.substring(0, unit.length - 1);
      }

      for (let i = 0; i < allMeasurements.length; i++) {
        if (allMeasurements[i].includes(unit)) {
          convertedUnit = (quantity === '1' ? allMeasurements[i][0] : allMeasurements[i][1]);
          break;
        }
      }
    }

    if (convertedUnit === null && unit != null) {
      return "Quantity must have a valid unit";
    }

    this.setState({quantity: parseInt(quantity), unit: convertedUnit,
      temp: '', quantityError: ''}, () => {
      const grocery_item = this.state
      this.props.editGroceryItem({grocery_item});
          // .then(data => this.props.history.push(`/grocery_items/${data.id}`))
      });

    return null;
  }


  update(property) {
    return e => {
      if (property === 'temp') {
        this.currentQuantity = e.target.value;
      }
      if (property === 'name' && e.target.value === '') {
        return this.setState({nameError: "Name cannot be blank"});
      }

      if (property === 'name' && e.target.value !== '') {
        this.setState({nameError: ''});
      }

      this.setState({[property]: e.target.value}, () => {
        if (this.state.temp === '') {
          const grocery_item = this.state;
          this.props.editGroceryItem({grocery_item});
            // .then(data => this.props.history.push(`/grocery_items/${data.id}`));
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
    const deleteGroceryItem = this.props.deleteGroceryItem;
    let quantity = grocery_item.quantity;
    if (grocery_item.unit !== null) {
      quantity = quantity + " " + grocery_item.unit;
    }

    return (
      <div>
        <div className="update-grocery-form-div">
          <form className="update-grocery-form">
            <TextField id="text-field-default"
              defaultValue={ quantity }
              underlineFocusStyle ={textboxUnderlineStyle}
              style={addItemTextBoxStyle1}
              onChange={this.update('temp')}
              onBlur={this.checkError}
            />
            <TextField id="text-field-default"
              defaultValue={ grocery_item.name }
              underlineFocusStyle ={textboxUnderlineStyle}
              style={addItemTextBoxStyle2}
              onChange={this.update('name')}
            />
          </form>

          <button className="grocery-button"
            onClick={() => deleteGroceryItem(grocery_item.id)}>
            Delete
          </button>
        </div>

        <ErrorBanner1 message={this.state.quantityError} />
        <ErrorBanner2 message={this.state.nameError} />
      </div>
    );
  }
}

export default GroceryIndexItem;
