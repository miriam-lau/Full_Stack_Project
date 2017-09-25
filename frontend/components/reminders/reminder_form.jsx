import React from "react";

import DayPicker from "react-day-picker";
import Modal from "react-modal";

import { reminderModalStyle } from "../utils/modal_styles";
import { addItemStyle, hintTextStyle } from "../utils/material_ui_styles";
import { TextField } from "material-ui";

/*
  Returns error message if "shouldShow" is true.
  @param {props} if true props.message is passed in
*/
function ErrorBanner(props) {
  if (props.shouldShow) {
    return (<div className="add-item-error">{ props.message }</div>);
  }
  return null;
}

class ReminderForm extends React.Component {
  constructor(props) {
    super(props);
    let moment = require("moment");
    let selectedDueDate = "";
    this.state = { name: "", modalIsOpen: false, errors: false,
        selectedDay: null };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);

    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // Opens the modal
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  // afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  // }

  // Closes the modal
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  // Defines the html element the modal will use
  componentWillMount() {
    Modal.setAppElement("div");
  }

  /*
    On changes to item fields, it will update the state of the property. If the property is "due_date", formats the due_date to "MM-DD-YYYY".
    @param {property} property of the item
  */
  update(property) {
    return event => {
      this.setState({ [property]: event.target.value, errors: false });
    }
  }

  /*
    On click, sets the selectedDueDate to a date String.
    @param {event}
  */
  handleSetDate(event) {
    this.selectedDueDate = "";

    let month = event.getMonth() + 1;
    let monthStr = "";
    monthStr = (month < 10) ? ("0" + month) : ("" + month);

    let dayStr = "";
    let day = event.getDate();
    dayStr = (day < 10) ? ("0" + day) : ("" + day);

    let year = event.getFullYear();

    this.selectedDueDate = monthStr + "-" + dayStr + "-" + year;
    this.closeModal();
  }

  /*
    On click, checks for errors and returns if error is found.  If not, creates a new reminder.
    @param {event}
  */
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.name === "") {
      this.setState({ errors: true });
      return;
    }

    if (this.selectedDueDate == null) {
      this.selectedDueDate = "";
    }

    let newReminder = {
      name: this.state.name,
      due_date: this.selectedDueDate
    };

    this.props.createReminder({ reminder: newReminder });
    this.selectedDueDate = "";
    this.setState({ name: "" });
  }

  render() {
    return (
      <form className="item-form">
        <div className="item-form-fields">
          <TextField id="reminder-text-field-default"
            value={ this.state.name }
            underlineShow={ false }
            style={ addItemStyle }
            hintText="Add a Reminder"
            hintStyle={ hintTextStyle }
            onChange={ this.update("name") }
          />

          <button className="button-date-wrapper" onClick={ this.openModal }>
            <div className="button-date">
              {this.selectedDueDate ?
                this.selectedDueDate : "Select a Due Date"
              }
            </div>
            <i className="fa fa-caret-down" aria-hidden="true"
                onClick={ this.handleSubmit }>
            </i>
          </button>

          <Modal
              isOpen={ this.state.modalIsOpen }
              onAfterOpen={ this.afterOpenModal }
              onRequestClose={ this.closeModal }
              style={ reminderModalStyle }
              contentLabel="reminder-calendar-modal">
            <div className="modal-icon">
              <i className="material-icons calendar-closeX"
                  onClick={ this.closeModal }>close</i>
            </div>
            <h2 className="calendar-title">Select a Date</h2>
            <br />
            <DayPicker
              enableOutsideDays
              selectedDays={ this.state.selectedDay }
              onDayClick={ this.handleSetDate }
            />
          </Modal>

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
