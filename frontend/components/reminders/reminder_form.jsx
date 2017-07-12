import React from "react";

import { addItemStyle, hintTextStyle } from "../utils/material_ui_styles";
import { TextField } from "material-ui";

function ErrorBanner(props) {
  if (props.shouldShow) {
    return (<div className="add-item-error">{ props.message }</div>);
  }
  return null;
}

class ReminderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", due_date: "", errors: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return e => {
      this.setState({ [property]: e.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("in handle submit");
  }

  render() {
    return (
      <form className="item-form" onSubmit={ this.handleSubmit }>
        <div className="item-form-fields">
          <TextField id="text-field-default"
            value={ this.state.name }
            underlineShow={ false }
            style={ addItemStyle }
            hintText="Add a Reminder"
            hintStyle={ hintTextStyle }
            onChange={ this.update("name") }
          />

          <input className="form-date" type="date"
              onChange={ this.update("due_date") } />

          <div className="plus-circle-reminder">
            <i className="fa fa-plus-circle fa-lg reminder-plus-circle"
                aria-hidden="true" onClick={ this.handleSubmit }>
            </i>
          </div>
        </div>

        <ErrorBanner shouldShow={ this.state.errors }
            message="Invalid entry. Entry must have 'name'" />
      </form>
    );
  }
}

export default ReminderForm;
