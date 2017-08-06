import React from "react";

import DayPicker from "react-day-picker";
import Modal from "react-modal";
import { reminderModalStyle } from "../utils/modal_styles";
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
    this.state = { name: "", date: "", due_date: "", modalIsOpen: false,
        errors: false };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeDueDate = this.changeDueDate.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // calendar modal functions
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentWillMount() {
    Modal.setAppElement("div");
  }

  update(property) {
    var moment = require("moment");

    return e => {
      console.log("in update property");
      if (property == "due_date") {
        this.setState({ due_date: "set due date" });
        this.closeModal();
      }

      // postgres format "DD MM YYYY"
      this.setState({ [property]: e.target.value }, () => {
        console.log("in set state of property");
        if (this.state.date == "customDate") {
          this.openModal();
        } else if (this.state.date == "today") {
          let today = moment().format("MM-DD-YYYY");
          this.setState({ due_date: today });
        } else if (this.state.date == "tomorrow") {
          let tomorrow = moment().add(1, "day").format("MM-DD-YYYY");
          this.setState({ due_date: tomorrow });
        }
      });
    }
  }

  changeDueDate(event) {
    this.setState({ due_date: "" });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("in handle submit");
  }

  render() {
    return (
      <form className="item-form" onSubmit={ this.handleSubmit }>
        <div className="item-form-fields">
          <TextField id="reminder-text-field-default"
            value={ this.state.name }
            underlineShow={ false }
            style={ addItemStyle }
            hintText="Add a Reminder"
            hintStyle={ hintTextStyle }
            onChange={ this.update("name") }
          />

          {this.state.due_date == "" ?
              <select className="form-date"
                  onChange={ this.update("date") }>
                <option selected="true" disabled="disabled">
                    Select a Due Date</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="customDate">Select a Date</option>
              </select> :
              <div className="selectedCustomDate">
                <input className="form-date-input" type="text"
                    value={ this.state.due_date } onClick={ this.changeDueDate }
                />
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </div>
          }

          <Modal
              isOpen={ this.state.modalIsOpen }
              onAfterOpen={ this.afterOpenModal }
              onRequestClose={ this.closeModal }
              style={ reminderModalStyle } >
            <div className="modal-icon">
              <i className="material-icons calendar-closeX"
                  onClick={ this.closeModal }>close</i>
            </div>
            <h2 className="calendar-title">Select a Date</h2>
            <br />
            <DayPicker
              enableOutsideDays
              selected= { this.state.date }
              onDayClick= { this.update("due_date") }
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

// split dateString
// let todayDateSplit = todayDate.split(",");
// console.log(todayDateSplit);
// let month = todayDateSplit[0];
// let day = todayDateSplit[1];
// let year = todayDateSplit[2];
// let today = day + "," + month + "," + year;
