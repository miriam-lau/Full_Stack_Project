import React from "react";

import Modal from "react-modal";
import FontIcon from "material-ui/FontIcon";

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

    return (
      <form className="recipe-calendar-form"
          onSubmit={ this.handleSubmit }>
        <h2 className="recipe-calendar-title">Select a Date</h2>
        <div className="recipe-calendar-directions">Recipe to make: "{recipe.name}"</div>

        <input className="recipe-form-date" type="date"
          placeholder="Select a date"
        />
        <button className="recipe-calendar-submit">Save Date</button>
      </form>
    );
  }
}

export default CalendarModalForm;
