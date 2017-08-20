import React from "react";
import { Route, Link } from "react-router-dom";

import ReminderFormContainer from "./reminder_form_container";
import ReminderItemContainer from "./reminder_item_container";

const reminderCategory =
    ["Overdue", null, "Due Today", "Due Tomorrow", "This Week", "Next Week"];

const recipeDates =
    ["Overdue", "This Week", "Coming Weeks"];

// create a map
const reminderCategoryMap = {
  null: "No Due Date"
};

class ReminderIndex extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { reminderCategory = "" };

    // let moment = require("moment");
    // let today = moment().format("MM-DD-YYYY");
    // let dueDate = this.props.reminder.due_date;
    // if (dueDate == nil) {
    //   this.setState({ reminderCategory = "No Due Date" });
    // } else if (dueDate == today) {
    //   this.setState({ reminderCategory = "Due Today" });
    // }
  }

  componentWillMount() {
    this.props.requestAllReminders();
  }
  // check the Date of the reminder, return true if fits, else false
  checkDate() {
    console.log("hello2");
  }

  render() {
    const reminders = this.props.reminders;
    console.log("in reminder index");
    // why is reminders empty?
    console.log(reminders);
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
                { category == null ? "No Due Date" : category }
              </h3>
              <ul className="items">
                {this.props.reminders.map((reminder) => {
                  return (
                    <div>{ reminder.name }</div>
                  )
                })}
              </ul>
            </div>
          )
        })}

        <section>
          <h2 className="planned-recipes-title">Planned Recipes</h2>
        </section>

        {recipeDates.map((category, idx) => {
          return (
            <div key={ idx } className="purchased-grocery-category-section">
              <h3 className="index-category reminder-index-category">
                { category }
              </h3>

            </div>
          )
        })}
      </div>
    );
  }
}

export default ReminderIndex;

// <ul className="items">
//   {this.props.reminders.map((reminder) => {
//     if (reminderCategoryMap.get(reminder.due_date) === reminderCategory) {
//       return ( <ReminderItemContainer
//         key={ reminder.id }
//         reminder={ reminder } />
//       )
//     }
//   })}
// </ul>
