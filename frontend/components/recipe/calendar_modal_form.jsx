import React from "react";

import DayPicker from "react-day-picker";
import FontIcon from "material-ui/FontIcon";
import merge from "lodash/merge";
import Modal from "react-modal";

class CalendarModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault;
    console.log("in modal set recipe date");
    var moment = require("moment");
    let setDate = moment().format("MM-DD-YYYY");
    // let updatedRecipe = merge({}, this.props.recipe);
    // updatedRecipe.due_date = setDate;
    // this.props.updateRecipe({ recipe: updatedRecipe }).then( (recipe) => {
    //   this.props.history.push("/pantry_items");
    // });
  }

  render() {
    let recipe = this.props.recipe;
    let disabledDays = {};

    return (
      <div>
        <h2 className="calendar-title">Select a Date</h2>
        <div className="recipe-calendar-directions">To make: "{recipe.name}"</div>

        <DayPicker className="date-picker"
          enableOutsideDays
          disabledDays={ disabledDays }
          onDayClick={ this.handleSubmit }
        />
      </div>
    );
  }
}

export default CalendarModalForm;
