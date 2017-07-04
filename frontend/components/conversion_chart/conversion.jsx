import React from 'react';
import { unitArray, liquid, dry, length, unitInfo } from './units';
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
          (property === VALUE1 || property === VALUE2) ?  unitArray[e.target.value] : e.target.value
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
                <select className="conversion-select"
                    onChange={this.update(VALUE1)}>
                  {unitArray.map((unit, idx) => {
                    return (
                      <option key={idx} value={idx}>{unit}</option>
                    )
                  })};
                </select>
              </div>
            </div>

            <span className="conversion-text-to">TO</span>

            <div className="conversion-div2">
              <section className="conversion-text-result"> {this.calculateResult()} </section>

              <div className="conversion-unit-selector">
                <select className="conversion-select"
                    onChange={this.update(VALUE2)}>
                  {unitArray.map((unit, idx) => {
                    return (
                      <option key={idx} value={idx}>{unit}</option>
                    )
                  })};
                </select>
              </div>
            </div>
          </div>

          {unitInfo.map((unit, idx) => {
            return (
              <section key={idx} className="conversion">
                <p><span className="conversion-topic">{unit[0]}: &nbsp;</span> {unit[1]}</p>
              </section>
            )
          })}

          </Drawer> : "" }
      </div>
    )
  }
}

export default Conversion;
