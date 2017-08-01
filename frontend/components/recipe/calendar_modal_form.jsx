import React from "react";

import DayPicker from "react-day-picker";
import FontIcon from "material-ui/FontIcon";
import Modal from "react-modal";

class CalendarModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log("in modal set recipe date");
  }

  render() {
    let recipe = this.props.recipe;
    let disabledDays = {};

    return (
      <div>
        <h2 className="recipe-calendar-title">Select a Date</h2>
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
