import React from "react";

import DayPicker from "react-day-picker";
import FontIcon from "material-ui/FontIcon";
import formatDate from "../utils/format_date";
import merge from "lodash/merge";
import Modal from "react-modal";

class CalendarModalForm extends React.Component {
  constructor(props) {
    super(props);
    let moment = require("moment");
    this.state = { selectedDay: moment().format("MM-DD-YYYY"),
        modalIsOpen: this.props.modalIsOpen };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault;
    console.log("in modal set recipe date");

    let month = event.getMonth() + 1;
    let monthStr = "";
    monthStr = (month < 10) ? ("0" + month) : ("" + month);

    let dayStr = "";
    let day = event.getDate();
    dayStr = (day < 10) ? ("0" + day) : ("" + day);

    let year = event.getFullYear();
    let customDate = monthStr + "-" + dayStr + "-" + year;
    
    console.log(customDate);

    this.setState({ selectedDay: customDate, modalIsOpen: false });
    // how to close modal after selecting a date

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
