import React from 'react';
import { Drawer, TextField } from 'material-ui';

const hintTextStyle = {
  "bottom": "3px",
  "color": "#333399",
  "margin-left": "18px"
}

const addItemTextBoxStyle = {
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "14px",
  "fontWeight": "bold",
  "width": "140px",
  "display": "inline",
  "text-align": "center",
  "height": "35px"
}

const unitArray = ["fluid ounce", "gill", "teaspoon", "teaspoon (dry)",
  "tablespoon", "tablespoon (dry)", "cup", "pint", "quart", "gallon",
  "ounce", "pound", "inch", "foot", "milliliter", "deciliter", "liter",
  "milligram", "gram", "kilogram", "millimeter", "centimeter", "meter"]

const liquid = ["fluid ounce", "gill", "teaspoon", "tablespoon", "cup",
  "pint", "quart", "gallon", "milliliter", "deciliter", "liter"]

const dry = ["teaspoon (dry)", "tablespoon (dry)", "ounce", "pound", "milligram",
  "gram", "kilogram"]

const length = ["inch", "foot", "millimeter", "centimeter", "meter"]

let liquidConversion = new Map();
  liquidConversion.set("teaspoon", 1);
  liquidConversion.set("tablespoon", 3);
  liquidConversion.set("fluid ounce", 6);
  liquidConversion.set("gill", 24);
  liquidConversion.set("cup", 48.7);
  liquidConversion.set("pint", 96);
  liquidConversion.set("quart", 192);
  liquidConversion.set("gallon", 768);
  liquidConversion.set("milliliter", 0.203);
  liquidConversion.set("deciliter", 20.3);
  liquidConversion.set("liter", 202.9);

let dryConversion = new Map();
  dryConversion.set("milligram", 1);
  dryConversion.set("gram", 1000);
  dryConversion.set("kilogram", 100000);
  dryConversion.set("teaspoon (dry)", 4724.9);
  dryConversion.set("tablespoon (dry)", 14174.8);
  dryConversion.set("ounce", 28349.5);
  dryConversion.set("cup", 226796);
  dryConversion.set("pound", 453592);

let lengthConversion = new Map();
  lengthConversion.set("millimeter", 1);
  lengthConversion.set("centimeter", 10);
  lengthConversion.set("meter", 1000);
  lengthConversion.set("inch", 25.4);
  lengthConversion.set("foot", 304.8);

class Conversion extends React.Component {
  constructor(props) {
    super(props);
    this.state={toggle: false, quantity: "", value1: "fluid ounce",
      value2: "fluid ounce"};

    this.handleToggle = this.handleToggle.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();
    this.setState({toggle: !this.state.toggle});
  }

  update(property) {
    return e => {
      if (property === 'value1' || property === 'value2') {
        this.setState({ [property]: unitArray[parseInt(e.target.value)] });
      } else {
        this.setState({ [property]: e.target.value });
      }
    }
  }

  calculateResult() {
    let result = 0;
    if (this.state.quantity === "") {
      return "";
    }
    if (liquid.includes(this.state.value1)) {
      if (liquid.includes(this.state.value2)) {
        result = ((parseFloat(this.state.quantity) *
          liquidConversion.get(this.state.value1)) /
          liquidConversion.get(this.state.value2)).toFixed(2);
      } else {
        return (
          <div className="conversion-result">Invalid conversion</div>
        )
      }
    } else if (dry.includes(this.state.value1)) {
      if (dry.includes(this.state.value2)) {
        result = ((parseFloat(this.state.quantity) *
          dryConversion.get(this.state.value1)) /
          dryConversion.get(this.state.value2)).toFixed(2);
      } else {
        return (
          <div className="conversion-result">Invalid conversion</div>
        )
      }
    } else if (length.includes(this.state.value1)) {
      if (length.includes(this.state.value2)) {
        result = ((parseFloat(this.state.quantity) *
          lengthConversion.get(this.state.value1)) /
          lengthConversion.get(this.state.value2)).toFixed(2);
      } else {
        return (
          <div className="conversion-result">Invalid conversion</div>
        )
      }
    }
    return (
      <div className="conversion-result">{result}</div>
    );
  }

  render() {
    return (
      <div>
        <i className="fa fa-calculator fa-lg" aria-hidden="true" onClick={this.handleToggle}></i>

        {this.state.toggle ? <Drawer width={400}
          containerStyle={{height: 'calc(100% - 80px)', top: 80}}
          openSecondary={true}>

          <div className="drawer-icon">
            <i className="material-icons closeX"
              onClick={this.handleToggle}>close</i>
          </div>

          <div className="drawer-text">Conversion Calculator</div>

          <div className="converter">
            <div className="conversion-div1">
              <TextField className="enter-quantity" id="text-field-default"
                defaultValue={ this.state.quantity }
                hintText="Enter a Quantity"
                hintStyle={hintTextStyle}
                underlineShow ={false}
                style={addItemTextBoxStyle}
                autoComplete="off"
                onChange={this.update('quantity')}
              />

              <select id="conversion-select" onChange={this.update("value1")}>
                <option value="0">fluid ounce</option>
                <option value="1">gill</option>
                <option value="2">teaspoon</option>
                <option value="3">teaspoon (dry)</option>
                <option value="4">tablespoon</option>
                <option value="5">tablespoon (dry)</option>
                <option value="6">cup</option>
                <option value="7">pint</option>
                <option value="8">quart</option>
                <option value="9">gallon</option>
                <option value="10">ounce</option>
                <option value="11">pound</option>
                <option value="12">inch</option>
                <option value="13">foot</option>
                <option value="14">milliliter</option>
                <option value="15">deciliter</option>
                <option value="16">liter</option>
                <option value="17">milligram</option>
                <option value="18">gram</option>
                <option value="19">kilogram</option>
                <option value="20">millimeter</option>
                <option value="21">centimeter</option>
                <option value="22">meter</option>
              </select>
            </div>

            <span className="conversion-text-to">TO</span>

            <div className="conversion-div2">
              <section className="conversion-text-result"> {this.calculateResult()} </section>

              <select id="conversion-select" onChange={this.update("value2")}>
                <option value="0">fluid ounce</option>
                <option value="1">gill</option>
                <option value="2">teaspoon</option>
                <option value="3">teaspoon (dry)</option>
                <option value="4">tablespoon</option>
                <option value="5">tablespoon (dry)</option>
                <option value="6">cup</option>
                <option value="7">pint</option>
                <option value="8">quart</option>
                <option value="9">gallon</option>
                <option value="10">ounce</option>
                <option value="11">pound</option>
                <option value="12">inch</option>
                <option value="13">foot</option>
                <option value="14">milliliter</option>
                <option value="15">deciliter</option>
                <option value="16">liter</option>
                <option value="17">milligram</option>
                <option value="18">gram</option>
                <option value="19">kilogram</option>
                <option value="20">millimeter</option>
                <option value="21">centimeter</option>
                <option value="22">meter</option>
              </select>
            </div>
          </div>

          <section className="conversion conversion1">
            <p><span className="conversion-topic">teaspoon: &nbsp;</span> teaspoon(s), t, tsp</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">tablespoon: &nbsp;</span>tablespoon(s), T, tbl, tbs, tbsp</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">fluidounce: &nbsp;</span>fluid ounce(s), fl oz</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">gill: &nbsp;</span>gill(s)</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">cup: &nbsp;</span>cup(s), c</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">pint: &nbsp;</span>pint(s), p, pt, fl pt</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">quart: &nbsp;</span>quart(s), q, qt, fl qt</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">gallon: &nbsp;</span>gallon(s), gal</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">ounce: &nbsp;</span>ounce(s), oz</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">pound: &nbsp;</span>pound(s), lb(s)</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">inch: &nbsp;</span>inch, inches, in</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">foot: &nbsp;</span>foot, feet, ft</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">milliliter: &nbsp;</span>milliliter(s), millilitre(s), ml, mL, cc</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">deciliter: &nbsp;</span>deciliter(s), decilitre(s), dL</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">liter: &nbsp;</span>liter(s), litre(s), L</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">milligram: &nbsp;</span>milligram(s), milligramme(s), mg</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">gram: &nbsp;</span>gram(s), gramme(s), g</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">kilogram: &nbsp;</span>kilogram(s), kilogramme(s), kg(s)</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">millimeter: &nbsp;</span>millimeter(s), millimetre(s), mm</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">centimeter: &nbsp;</span>centimeter(s), centimetre(s), cm</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">meter: &nbsp;</span>meter(s), metre(s), m</p>
          </section>

          </Drawer> : "" }
      </div>
    )
  }
}

export default Conversion;
