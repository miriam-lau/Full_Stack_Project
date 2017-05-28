import React from 'react';
import { Drawer } from 'material-ui';

const iconStyle = { "padding": "10px" }

const unitArray = ["fluid ounce", "gill", "teaspoon", "tablespoon",
  "cup", "pint", "quart", "gallon", "ounce", "pound", "inch", "foot",
  "milliliter", "liter", "deciliter", "milligram", "gram", "kilogram",
  "millimeter", "centimeter", "meter"]

const liquid = ["fluid ounce", "gill", "teaspoon", "tablespoon", "cup",
  "pint", "quart", "gallon", "milliliter", "liter", "deciliter"]

const dry = ["teaspoon", "tablespoon", "ounce", "pound", "milligram",
  "gram", "kilogram"]

const length = ["inch", "foot", "millimeter", "centimeter", "meter"]

const floz = 1;
const gill = (floz * 4);
const flTsp = (floz * 6);
const flTbsp = (flTsp * 3);
const cup = (flTbsp * 16)
const pint = (cup * 2);
const qt = (pint * 2);
const gal = (qt * 4);
const mL = (floz * 29.6);
const L = (mL * 1000);
const dL = (L * 10);

const tsp = 1;
const tbsp = (tsp * 3);
const oz = (tbsp * 2);
const lb = (oz * 16);
const mg = (tsp / 5000);
const g = (mg * 1000);
const kg = (g * 1000);

const inch = 1;
const ft = (inch * 12);
const mm = (inch / 25.4);
const cm = (mm * 10);
const m = (cm * 100);


class Conversion extends React.Component {
  constructor(props) {
    super(props);
    this.state={toggle: false, quantity: 0, value1: "", value2: ""};

    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();
    this.setState({toggle: !this.state.toggle});
  }

  handleChange1(event) {
    event.preventDefault();
    this.setState({value1: unitArray[parseInt(event.target.value)]});
  }

  handleChange2(event) {
    event.preventDefault();
    this.setState({value2: unitArray[parseInt(event.target.value)]});
  }

  render() {
    console.log("in conversion");
    console.log(this.state);
    return (
      <div>
        <button onClick={this.handleToggle} className="header-button">Measurements</button>

        {this.state.toggle ?
          <Drawer
            width={400}
            containerStyle={{height: 'calc(100% - 80px)', top: 80}}
            openSecondary={true}>

            <div className="drawer-icon">
              <i className="material-icons"
                style={iconStyle}
                onClick={this.handleToggle}>close</i>
            </div>


            <section className="tutorial">
              <p><span className="tutorial-topic">teaspoon: &nbsp;</span> teaspoon, teaspoons, t, tsp</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">tablespoon: &nbsp;</span>tablespoon, tablespoons, T, tbl, tbs, tbsp</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">fluidounce: &nbsp;</span>fluid ounce, fluid ounces, fl oz</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">cup: &nbsp;</span>cup, cups, c</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">pint: &nbsp;</span>pint, pints, p, pt, fl pt</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">quart: &nbsp;</span>quart, quarts, q, qt, fl qt</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">gallon: &nbsp;</span>gallon, gallons, gal</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">ounce: &nbsp;</span>ounce, ounces, oz</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">pound: &nbsp;</span>pound, pounds, lb, lbs</p>
            </section>


            <section className="tutorial">
              <p><span className="tutorial-topic">milliliter: &nbsp;</span>milliliter, milliliters, millilitre, millilitres, ml, cc, mL</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">gill: &nbsp;</span>gill, gills</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">liter: &nbsp;</span>liter, liters, litre, litres, L</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">deciliter: &nbsp;</span>deciliter, deciliters, decilitre, decilitres, dL</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">milligram: &nbsp;</span>milligram, milligrams, milligramme, milligrammes, mg</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">gram: &nbsp;</span>gram, grams, gramme, grammes, g</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">kilogram: &nbsp;</span>kilogram, kilograms, kilogramme, kilogrammes, kg, kgs</p>
            </section>

          </Drawer> : ""
        }
      </div>
    )
  }
}

export default Conversion;

// <section className="tutorial">
// <p><span className="tutorial-topic">inch: &nbsp;</span>inch, inches, in, "</p>
// </section>
//
// <section className="tutorial">
// <p><span className="tutorial-topic">foot: &nbsp;</span>foot, feet, ft, '</p>
// </section>
//
// <section className="tutorial">
// <p><span className="tutorial-topic">millimeter: &nbsp;</span>millimeter, millimeters, millimetre, millimetres, mm</p>
// </section>
//
// <section className="tutorial">
// <p><span className="tutorial-topic">centimeter: &nbsp;</span>centimeter, centimeters, centimetre, centimetres, cm</p>
// </section>
//
// <section className="tutorial">
// <p><span className="tutorial-topic">meter: &nbsp;</span>meter, meters, metre, metres, m</p>
// </section>


// <section>
// <p>Convert</p>
// <input value="" placeholder="Quantity"></input>
// <select onChange={this.handleChange1}>
// <option value="0">fluid ounce</option>
// <option value="1">gill</option>
// <option value="2">teaspoon</option>
// <option value="3">tablespoon</option>
// <option value="4">cup</option>
// <option value="5">pint</option>
// <option value="6">quart</option>
// <option value="7">gallon</option>
// <option value="8">ounce</option>
// <option value="9">pound</option>
// <option value="10">inch</option>
// <option value="11">foot</option>
// <option value="12">milliliter</option>
// <option value="13">liter</option>
// <option value="14">deciliter</option>
// <option value="15">milligram</option>
// <option value="16">gram</option>
// <option value="17">kilogram</option>
// <option value="18">millimeter</option>
// <option value="19">centimeter</option>
// <option value="20">meter</option>
// </select>
//
// <p>to</p>
//
// <select onChange={this.handleChange1}>
// <option value="0">fluid ounce</option>
// <option value="1">gill</option>
// <option value="2">teaspoon</option>
// <option value="3">tablespoon</option>
// <option value="4">cup</option>
// <option value="5">pint</option>
// <option value="6">quart</option>
// <option value="7">gallon</option>
// <option value="8">ounce</option>
// <option value="9">pound</option>
// <option value="10">inch</option>
// <option value="11">foot</option>
// <option value="12">milliliter</option>
// <option value="13">liter</option>
// <option value="14">deciliter</option>
// <option value="15">milligram</option>
// <option value="16">gram</option>
// <option value="17">kilogram</option>
// <option value="18">millimeter</option>
// <option value="19">centimeter</option>
// <option value="20">meter</option>
// </select>
//
// <p>Result: </p>
// {}
// </section>
