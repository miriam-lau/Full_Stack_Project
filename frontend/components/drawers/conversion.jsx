import React from "react";

import { TextField } from "material-ui";
import { unitArray, liquid, dry, length, unitInfo } from "./units";
import { conversionHintTextStyle, conversionAddItemTextBoxStyle } from
    "../utils/material_ui_styles";

const VALUE1 = "value1";
const VALUE2 = "value2";

var UnitTypeEnum = {
  LIQUID: 0,
  DRY: 1,
  LENGTH: 2,
};

// Liquid conversion measurements
let liquidConversion = new Map([
    ["teaspoon", 1],
    ["tablespoon", 3],
    ["fluid ounce", 6],
    ["gill", 24],
    ["cup", 48.7],
    ["pint", 96],
    ["quart", 192],
    ["gallon", 768],
    ["milliliter", 0.203],
    ["deciliter", 20.3],
    ["liter", 202.9]
]);

// Dry conversion measurements
let dryConversion = new Map([
  ["milligram", 1],
  ["gram", 1000],
  ["kilogram", 100000],
  ["teaspoon (dry)", 4724.9],
  ["tablespoon (dry)", 14174.8],
  ["ounce", 28349.5],
  ["cup", 226796],
  ["pound", 453592]
]);

// Length conversion measurements
let lengthConversion = new Map([
  ["millimeter", 1],
  ["centimeter", 10],
  ["meter", 1000],
  ["inch", 25.4],
  ["foot", 304.8]
]);

class Conversion extends React.Component {
  constructor(props) {
    super(props);
    this.state= { quantity: ""};
    this.state[VALUE1] = unitArray[0];
    this.state[VALUE2] = unitArray[0];

    this.calculateResult = this.calculateResult.bind(this);
    this.unitType = this.unitType.bind(this);
  }

  /*
    On change, it will update the corresponding property.
    @param {property} property of the item
  */
  update(property) {
    return e => {
      this.setState({ [property]:
          (property === VALUE1 || property === VALUE2) ?  unitArray[e.target.value] : e.target.value
      });
    }
  }

  /*
    Finds the corresponding conversion type for the unit
    @param {unit} unit choosen
  */
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
    return null;
  }

  // Calculates the conversion from the initial unit to the desired unit.
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
        <div className="drawer-text">Conversion Calculator</div>
        <div className="converter">
          <div className="conversion-div1">
            <TextField className="enter-quantity" id="text-field-default"
                defaultValue={ this.state.quantity }
                hintText="Enter a Quantity"
                hintStyle={ conversionHintTextStyle }
                underlineShow ={ false }
                style={ conversionAddItemTextBoxStyle }
                autoComplete="off"
                onChange={ this.update("quantity") }
            />

            <div className="conversion-unit-selector">
              <select className="conversion-select"
                  onChange={ this.update(VALUE1) }>
                {unitArray.map((unit, idx) => {
                  return (
                    <option key={ idx } value={ idx }>{ unit }</option>
                  )
                })};
              </select>
            </div>
          </div>

          <span className="conversion-text-to">TO</span>

          <div className="conversion-div2">
            <section className="conversion-text-result">
                {this.calculateResult()}
            </section>

            <div className="conversion-unit-selector">
              <select className="conversion-select"
                  onChange={ this.update(VALUE2) }>
                {unitArray.map((unit, idx) => {
                  return (
                    <option key={ idx } value={ idx }>{ unit }</option>
                  )
                })};
              </select>
            </div>
          </div>
        </div>

        {unitInfo.map((unit, idx) => {
          return (
            <section key={idx} className="conversion">
              <p>
                <span className="conversion-topic">{ unit[0] }: &nbsp;</span>
                  { unit[1] }
              </p>
            </section>
          )
        })}
      </div>
    )
  }
}

export default Conversion;
