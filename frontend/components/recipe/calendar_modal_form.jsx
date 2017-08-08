import React from "react";

import DayPicker from "react-day-picker";
import FontIcon from "material-ui/FontIcon";
import merge from "lodash/merge";
import Modal from "react-modal";

class CalendarModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDay: new Date() };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault;
    console.log("in modal set recipe date");
    var moment = require("moment");
    this.setState({ selectedDay: event }, () => {
      // close modal after selecting a date
      this.props.modalIsOpen = false;
    });
    let setDate = moment().format("MM-DD-YYYY");
    // let updatedRecipe = merge({}, this.props.recipe);
    // updatedRecipe.due_date = setDate;
    // this.props.updateRecipe({ recipe: updatedRecipe }).then( (recipe) => {
    //   this.props.history.push("/pantry_items");
    // });
  }

  render() {
    console.log(this.state.selectedDay);
    let recipe = this.props.recipe;
    let disabledDays = {};
    let selectedDay = this.state.selectedDay;
    return (
      <div>
        <h2 className="calendar-title">Select a Date</h2>
        <div className="recipe-calendar-directions">To make: "{recipe.name}"</div>

        <DayPicker className="date-picker"
          enableOutsideDays
          disabledDays={ disabledDays }
          selectedDays={ this.state.selectedDay }
          onDayClick={ this.handleSubmit }
        />
      </div>
    );
  }
}

export default CalendarModalForm;
