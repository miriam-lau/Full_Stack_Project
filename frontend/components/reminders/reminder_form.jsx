import React from "react";

import DayPicker from "react-day-picker";
import Modal from "react-modal";
import { addItemStyle, hintTextStyle } from "../utils/material_ui_styles";
import { TextField } from "material-ui";

function ErrorBanner(props) {
  if (props.shouldShow) {
    return (<div className="add-item-error">{ props.message }</div>);
  }
  return null;
}

const customStyles = {
  content : {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #333399",
    height: "380px"
  }
};

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
    this.setState({modalIsOpen: false});
  }

  componentWillMount() {
    Modal.setAppElement("div");
  }

  update(property) {
    return e => {
      console.log("in update property");
      if (property == "due_date") {
        this.setState({ due_date: "set due date"});
        this.closeModal();
      }
      this.setState({ [property]: e.target.value }, () => {
        console.log("in set state of property");
        if (this.state.date == "customDate") {
          this.openModal();
        }
      });
    }
  }

  changeDueDate(event) {
    this.setState({ due_date: ""});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("in handle submit");
  }

  render() {
    console.log(this.state.date);
    console.log(this.state.modalIsOpen);
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
                <option value="oneWeek">In One Week</option>
                <option value="customDate">Select a Date</option>
              </select> :
              <div className="selectedCustomDate">
                <input className="form-date-input" type="text"
                    value={ this.state.due_date } onClick={ this.changeDueDate }
                />
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </div>
          }

          <Modal isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} >
            <div className="modal-icon">
              <i className="material-icons closeX"
                  onClick={ this.closeModal }>close</i>
            </div>
            <h2 className="recipe-calendar-title">Select a Date</h2>
            <br />
            <DayPicker
              enableOutsideDays
              onDayClick= { this.update("due_date")}
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
