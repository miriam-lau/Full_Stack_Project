import React from "react";
import { Route, Link } from "react-router-dom";

import ReminderFormContainer from "./reminder_form_container";
import ReminderItem from "./reminder_item";

// Categories for reminders
const reminderCategory =
    ["Overdue", "None", "Due Today", "This Week", "Coming Weeks"];

class ReminderIndex extends React.Component {
  constructor(props) {
    super(props);

    this.isCategory = this.isCategory.bind(this);
  }

  componentWillMount() {
    this.props.requestAllReminders();
  }

  // check the Date of the reminder, return true if fits, else false
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

      if (reminderMonth === currentMonth && reminderYear === currentYear) {
        if (reminderDay === currentDay) {
          dateCategory = "Due Today";
        } else if (reminderDay <= (currentDay + 7)) {
          dateCategory = "This Week";
        }
      } else if (reminderMonth < currentMonth || reminderYear < currentYear ||
          (reminderMonth === currentMonth && reminderDay < currentDay)) {
        dateCategory = "Overdue";
      } else {
        dateCategory = "Coming Weeks";
      }
    }

    console.log("in isCategory function");
    console.log(dateCategory);
    console.log(category);
    return (dateCategory === category);
  }

  render() {
    const reminders = this.props.reminders;

    console.log("in reminder index");
    reminders.map((reminder) => {
      console.log(reminder);
    });

    return (
      <div>
        <section>
          <h2 className="index-title">Reminders</h2>
        </section>

        <div className="add-reminder">
          <ReminderFormContainer />
        </div>

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
                        deleteReminder={ this.props.deleteReminder }
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
