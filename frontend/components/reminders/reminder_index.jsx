import React from "react";
import { Route, Link } from "react-router-dom";

import ReminderFormContainer from "./reminder_form_container";
import ReminderItem from "./reminder_item";

// Categories for reminders
const reminderCategory =
    ["Overdue", "None", "Due Today", "Upcoming Reminders"];

class ReminderIndex extends React.Component {
  constructor(props) {
    super(props);
    this.isCategory = this.isCategory.bind(this);
  }

  componentWillMount() {
    this.props.requestAllReminders();
  }

  /*
    Sets the date category for the reminder. Returns true if the date category matches the category passed in.
    param {string} due date of reminder
    param {category} category
    return {boolean}
  */
  isCategory(due_date, category) {
    let moment = require("moment");
    let todayString = moment().format("MM-DD-YYYY");
    let todaySplit = todayString.split("-");
    let currentMonth = parseInt(todaySplit[0]);
    let currentDay = parseInt(todaySplit[1]);
    let currentYear = parseInt(todaySplit[2]);

    let reminderMonth = -1;
    let reminderDay = -1;
    let reminderYear = -1;

    let dateCategory;
    if (due_date === "") {
      dateCategory = "None";
    } else {
      let reminderDateSplit = due_date.split("-");
      let reminderMonth = parseInt(reminderDateSplit[0]);
      let reminderDay = parseInt(reminderDateSplit[1]);
      let reminderYear = parseInt(reminderDateSplit[2]);

      if (reminderYear === currentYear) {
        if (reminderMonth === currentMonth) {
          if (reminderDay === currentDay) {
            dateCategory = "Due Today";
          } else if (reminderDay > currentDay) {
            dateCategory = "Upcoming Reminders";
          } else {
            dateCategory = "Overdue";
          }
        } else if (reminderMonth > currentMonth) {
          dateCategory = "Upcoming Reminders";
        } else {
          dateCategory = "Overdue";
        }
      } else if (reminderYear > currentYear) {
        dateCategory = "Upcoming Reminders";
      } else {
        dateCategory = "Overdue";
      }
    }

    return (dateCategory === category);
  }

  handleDelete(event) {
    console.log("here");
  }

  render() {
    const reminders = this.props.reminders;

    return (
      <div className="reminders">
        <h2 className="index-title">Reminders</h2>

        <section className="add-reminder">
          <ReminderFormContainer />
        </section>

        {reminderCategory.map((category, idx) => {
          return (
            <div key={ idx } className="purchased-grocery-category-section">
              <h3 className="index-category reminder-index-category">
                { category }
              </h3>

              <ul className="reminder-items">
                {this.props.reminders.map((reminder) => {
                  if (this.isCategory(reminder.due_date, category)) {
                    return (
                      <ReminderItem
                        key={ reminder.id }
                        reminder={ reminder }
                        deleteReminder = { this.props.deleteReminder }
                      />
                    )
                  }
                })}
              </ul>
            </div>
          )
        })}
      </div>
    );
  }
}

export default ReminderIndex;
