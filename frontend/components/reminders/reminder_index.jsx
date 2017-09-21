import React from "react";
import { Route, Link } from "react-router-dom";

import RecipeReminderItem from "./recipe_reminder_item";
import ReminderFormContainer from "./reminder_form_container";
import ReminderItem from "./reminder_item";

// Categories for reminders
const reminderCategory =
    ["Overdue", "None", "Due Today", "This Week", "Coming Weeks"];

class ReminderIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestAllReminders();
    this.props.requestAllRecipes();
  }

  // check the Date of the reminder, return true if fits, else false
  checkDate() {
    console.log("hello2");
  }

  render() {
    const reminders = this.props.reminders;
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
                  if (reminder.due_date === category) {
                    return (
                      <ReminderItem
                        key={ reminder.id }
                        reminder={ reminder }
                        deleteReminder={ this.props.deleteReminder }
                      />
                    )
                  }
                })}

                {this.props.recipes.map((recipe) => {
                  if (recipe.due_date !== "none") {
                    return (
                      <RecipeReminderItem
                        key={ recipe.id }
                        recipe={ recipe }
                        updateRecipe={ this.props.updateRecipe }
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
