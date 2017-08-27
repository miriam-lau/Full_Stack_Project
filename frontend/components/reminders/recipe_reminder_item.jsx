import React from "react";

import { styles } from "../utils/material_ui_styles";

class RecipeReminderItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveDate = this.handleRemoveDate.bind(this);
  }

// when to use this function?
  displayDate(due_date) {
    let moment = require("moment");
    let todayString = moment().format("MM-DD-YYYY");
    let todaySplit = todayString.split("-");
    let currentMonth = parseInt(todaySplit[0]);
    let currentDay = parseInt(todaySplit[1]);
    let currentYear = parseInt(todaySplit[2]);
    console.log("date");
    console.log(currentMonth);
    console.log(currentDay);
    console.log(currentYear);

    let recipeDateSplit = due_date.split("-");
    let recipeMonth = parseInt(recipeDateSplit[0]);
    let recipeDay = parseInt(recipeDateSplit[1]);
    let recipeYear = parseInt(recipeDateSplit[2]);

    if (recipeMonth === currentMonth && recipeYear === currentYear) {
      if (recipeDay === currentDay) {
        this.setState({ dateCategory: "Today" });
      } else if (recipeDay <= (currentDay + 7)) {
        this.setState({ dateCategory: "This Week" });
      }
    } else if (recipeMonth < currentMonth || recipeYear < currentYear ||
        (recipeMonth === currentMonth && recipeDay < currentDay)) {
      this.setState({ dateCategory: "Overdue" });
    } else {
      this.setState({ dateCategory: "Coming Weeks" });
    }
  }

  handleRemoveDate() {
    this.setState({ due_date: "" });
    // update recipe
  }

  render() {
    const recipe = this.props.recipe;
    console.log(recipe);
    
    return (
      <div className="reminder-item">
        <div>{ recipe.due_date }: { recipe.name }</div>

        <i className="material-icons trash-can"
            style={ styles }
            onClick={ this.handleRemoveDate }>
          delete_forever
        </i>
      </div>
    );
  }
}

export default RecipeReminderItem;
