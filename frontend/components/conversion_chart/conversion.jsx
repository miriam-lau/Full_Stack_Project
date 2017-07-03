import React from 'react';
import { unitArray, liquid, dry, length } from './units';
import { Drawer, TextField } from 'material-ui';

const VALUE1 = "value1";
const VALUE2 = "value2";

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
  "height": "35px",
  "border-bottom": "1px solid #C0C0C0",
  "color": "#333399"
}

var UnitTypeEnum = {
  LIQUID: 0,
  DRY: 1,
  LENGTH: 2,
};

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
    this.state={toggle: false, quantity: ""};
    this.state[VALUE1] = unitArray[0];
    this.state[VALUE2] = unitArray[0];

    this.handleToggle = this.handleToggle.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.unitType = this.unitType.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();
    this.setState({toggle: !this.state.toggle});
  }

  update(property) {
    return e => {
      this.setState({ [property]:
          (property === VALUE1 || property === VALUE2) ?  unitArray[parseInt(e.target.value)] : e.target.value
      });
    }
  }

  unitType(unit) {
    if (liquid.includes(unit)) {
      return UnitTypeEnum.LIQUID;
    }
    if (dry.includes(unit)) {
      return UnitTypeEnum.DRY;
    }
    if (length.includes(unit)) {
      return UnitTypeEnum.LENGTH;
    }
  }

  calculateResult() {
    let result = 0;
    if (this.state.quantity === "") {
      return "";
    }

    let unit1 = this.state.value1;
    let unit2 = this.state.value2;
    let unitType1 = this.unitType(unit1);
    let unitType2 = this.unitType(unit2);
    console.log(unitType1);
    console.log(unitType2);

    if (unitType1 !== unitType2) {
      return (
        <div className="conversion-result">Invalid conversion</div>
      )
    }

    let ratio;
    switch(unitType1) {
      case UnitTypeEnum.LIQUID:
        ratio = liquidConversion.get(this.state.value1) /
            liquidConversion.get(this.state.value2);
        break;
      case UnitTypeEnum.DRY:
        ratio = dryConversion.get(this.state.value1) /
            dryConversion.get(this.state.value2);
        break;
      case UnitTypeEnum.LENGTH:
        ratio = lengthConversion.get(this.state.value1) /
            lengthConversion.get(this.state.value2);
        break;
      default:
        return "";
    }
    
    return (
      <div className="conversion-result">
          {(parseFloat(this.state.quantity) * ratio).toFixed(2)}
      </div>
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

              <div className="conversion-unit-selector">
                <select className="conversion-select" onChange={this.update(VALUE1)}>
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

            <span className="conversion-text-to">TO</span>

            <div className="conversion-div2">
              <section className="conversion-text-result"> {this.calculateResult()} </section>

              <div className="conversion-unit-selector">
                <select className="conversion-select" onChange={this.update(VALUE2)}>
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
          </div>

          <section className="conversion conversion1">
            <p><span className="conversion-topic">teaspoon: &nbsp;</span> teaspoon(s), t, tsp</p>
          </section>
          <section className="conversion">
            <p><span className="conversion-topic">tablespoon: &nbsp;</span>tablespoon(s), T, tbsp</p>
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
            <p><span className="conversion-topic">milliliter: &nbsp;</span>milliliter(s), millilitre(s), ml, mL</p>
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
