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
  "marginRight": "50px"
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


class PantryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    let pantry_item = this.props.pantry_item;

    console.log("in constructor pantry index item");
    console.log(pantry_item);
    this.state = { id: pantry_item.id, user_id: pantry_item.user_id, temp: '' }
    this.parseUpdateQuantity = this.parseUpdateQuantity.bind(this);
  }

  // componentDidMount() {
  //   console.log("in component did mount");
  //   console.log(this.props);
  //   this.props.requestPantryItem(this.props.pantry_item.match.params.id)
  //     .then(() => {this.setState(this.props.pantry_item); });
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log("in pantry INDEX ITEM componentWillReceiveProps");
  //   if (this.props.pantry_item.match.params.id !== nextProps.pantry_item.match.params.id) {
  //     this.props.requestPantryItem(nextProps.pantry_item.match.params.id);
  //   }
  // }

  parseUpdateQuantity(str) {
    let words = str.split(' ');
    let firstNum = /(^\d+(?:\.\d+)?)/;
    let splitFirstWord = words.shift().split(firstNum);
    if (splitFirstWord.length === 1) {
      console.log("parseUpdateQuantity first return");
      return false;
    }

    words = splitFirstWord.concat(words);
    words = words.filter(function(el) {
      console.log("parseUpdateQuantity word filter return");
      return (el.trim() !== '');
    });

    let quantity = words.shift();
    let unit = words[0];
    let convertedUnit = null;

    if (unit == null || unit.length === 0) {
      console.log("parseUpdateQuantity 2nd return");
     return false;
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

    if (convertedUnit === null) {
      convertedUnit = '';
    }

  this.setState({quantity: parseInt(quantity), unit: convertedUnit, temp: ''}, () => {
      // console.log('in parseAdd item update');
      const pantry_item = this.state
      this.props.editPantryItem({pantry_item});
          // .then(data => this.props.history.push(`/pantry_items/${data.id}`))
      });

    return true;
  }


  update(property) {
    return e => this.setState({[property]: e.target.value}, () => {
      if (this.state.temp === '') {
        const pantry_item = this.state;
        this.props.editPantryItem({pantry_item});
          // .then(data => this.props.history.push(`/pantry_items/${data.id}`));
      } else {
        this.parseUpdateQuantity(this.state.temp);
      }
    });
  }

  render() {
    const pantry_item = this.props.pantry_item;
    const deletePantryItem = this.props.deletePantryItem;
    let quantity = pantry_item.quantity;
    if (pantry_item.unit !== null) {
      quantity = quantity + " " + pantry_item.unit;
    }

    console.log("pantry index item");
    console.log(pantry_item);

    return (
      <div className="update-pantry-form-div">
        <form className="update-pantry-form">
          <TextField id="text-field-default"
            defaultValue={ quantity }
            underlineFocusStyle ={textboxUnderlineStyle}
            style={addItemTextBoxStyle1}
            onChange={this.update('temp')}
          />
          <TextField id="text-field-default"
            defaultValue={ pantry_item.name }
            underlineFocusStyle ={textboxUnderlineStyle}
            style={addItemTextBoxStyle2}
            onChange={this.update('name')}
          />

        </form>
        <button className="pantry-button"
          onClick={() => deletePantryItem(pantry_item.id)}>
          Delete
        </button>

      </div>
    );
  }
}

export default PantryIndexItem;

// <button className="pantry-button"
// onClick={ () => {deletePantryItem(pantry_item.id)} }>
// Delete
// </button>


// onChange={this.handleChange}
// <Link to={`/pantry_items/${pantry_item.id}`}></Link>
// <button className="pantry-button"
//   onClick={ () => {editPantryItem(pantry_item.id)} }>
//   Update Pantry Item
// </button>

// handleSubmit(event) {
//   event.preventDefault();
//   console.log("in handle submit");
//   if (this.state.temp === '') {
//     const pantry_item = this.state;
//     this.props.editPantryItem({pantry_item})
//       .then(data => this.props.history.push(`/pantry_items/${data.id}`));
//   } else {
//     this.parseUpdateQuantity(this.state.temp);
//   }
// }
