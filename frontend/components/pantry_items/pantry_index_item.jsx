import React from 'react';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';

const textboxUnderlineFocusStyle = {
  'borderColor': '#333399'
}

const textboxUnderlineStyle = {
  'borderColor': '#C0C0C0'
}

const addItemTextBoxStyle1 = {
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "13px",
  "fontWeight": "bold",
  "width": "150px",
  "display": "inline",
  "textAlign": "left",
  "marginRight": "20px",
  "height": "35px",
}

const addItemTextBoxStyle2 = {
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "13px",
  "fontWeight": "bold",
  "width": "300px",
  "display": "inline",
  "height": "35px",
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

function ErrorBanner1(props) {
  if (props.message != null) {
    return (
      <div className="pantry-item-error">
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
      <div className="pantry-item-error">
        { props.message }
      </div>
    );
  } else {
    return null;
  }
}

class PantryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    let pantry_item = this.props.pantry_item;
    this.state = { id: pantry_item.id, user_id: pantry_item.user_id,
      quantityError: '', nameError: '' };
    this.parseUpdateQuantity = this.parseUpdateQuantity.bind(this);
    this.unparsedQuantityString = '';
    this.checkError = this.checkError.bind(this);
    this.currentQuantity = this.props.pantry_item.quantity;
    if (pantry_item.unit != null && pantry_item.unit.length !== 0) {
      this.currentQuantity = this.currentQuantity + " " + pantry_item.unit;
    }
  }

  parseUpdateQuantity(str) {
    let words = str.split(' ');
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
      return {convertedQuantity: null, errorMessage: "Quantity must begin with a number"};
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
      return {convertedQuantity: null, errorMessage: "Quantity must have a valid unit"};
    }

    return {
      convertedQuantity: {quantity: parseInt(quantity),
        unit: convertedUnit,
        quantityError: ''},
      errorMessage: ''
    };
  }


  update(property) {
    return e => {
      if (property === 'unparsed_quantity') {
        let pantry_item = this.props.pantry_item;
        let unparsedQuantity = e.target.value;
        pantry_item.unparsed_quantity = unparsedQuantity;
        let parsedUpdateQuantity = this.parseUpdateQuantity(unparsedQuantity);
        if (parsedUpdateQuantity.convertedQuantity != null) {
          pantry_item.quantity = parsedUpdateQuantity.convertedQuantity.quantity;
          pantry_item.unit = parsedUpdateQuantity.convertedQuantity.unit;
        }
        this.props.editPantryItemDbOnly({pantry_item});
      } else if (property === 'name') {
        if (e.target.value === '') {
          return this.setState({nameError: "Name cannot be blank"});
        }

        if (e.target.value !== '') {
          this.setState({nameError: ''});
        }

        let pantry_item = this.props.pantry_item;
        pantry_item.name = e.target.value;
        this.props.editPantryItemDbOnly({pantry_item});
      }
    }
  }

  checkError() {
    let parsedQuantity = this.parseUpdateQuantity(this.currentQuantity);
    if (parsedQuantity.convertedQuantity != null) {
      this.setState({quantityError: parsedQuantity.errorMessage});
    }
  }

// put onBlur for name update
  render() {
    const pantry_item = this.props.pantry_item;
    const deletePantryItem = this.props.deletePantryItem;

    return (
      <div>
        <div className="update-pantry-form-div">

          <form className="update-pantry-form">
            <TextField id="text-field-default"
              value={ pantry_item.unparsed_quantity }
              underlineFocusStyle ={textboxUnderlineFocusStyle}
              underlineStyle={textboxUnderlineStyle}
              style={addItemTextBoxStyle1}
              onChange={this.update('unparsed_quantity')}
              onBlur={this.checkError}
            />
            <TextField id="text-field-default"
              value={ pantry_item.name }
              underlineFocusStyle ={textboxUnderlineFocusStyle}
              underlineStyle={textboxUnderlineStyle}
              style={addItemTextBoxStyle2}
              onChange={this.update('name')}
            />
          </form>

          <i className="material-icons trash-can"
            onClick={() => deletePantryItem(pantry_item.id)}>
            delete_forever</i>
        </div>

        <ErrorBanner1 message={this.state.quantityError} />
        <ErrorBanner2 message={this.state.nameError} />
      </div>
    );
  }
}

export default PantryIndexItem;
