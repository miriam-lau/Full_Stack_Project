import React from "react";
import { Route, Link } from "react-router-dom";

import ReminderFormContainer from "./reminder_form_container";
import ReminderItemContainer from "./reminder_item_container";

// GET url api/reminders 500 internal server error
// reminders displayed on same page as pantry items, need to fix that

const reminderCategory =
    ["No Due Date", "Due Today", "Due Tomorrow", "This Week", "Next Week"];

// create a map
const reminderCategoryMap = {
  nil: "No Due Date"
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

// <ul className="items reminder-items">
// {this.props.reminders.map((reminder) => {
//   if (checkDate(item) === true) {
//     return ( <ReminderItemContainer
//       key={ reminder.id }
//       reminder={ reminder } />
//     )
//   }
// })}
// </ul>
