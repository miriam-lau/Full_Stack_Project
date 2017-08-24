import React from "react";
import { Route, Link } from "react-router-dom";

class RecipeReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dateCategory: "" };
    this.displayDate = this.displayDate.bind(this);
  }

  componentWillMount() {
    this.props.requestAllRecipes();
  }

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

  render() {
    const recipes = this.props.recipes;
    return (
      <div>
        <ul className="reminder-items">
          {this.props.recipes.map((recipe) => {
            this.displayDate(recipe.due_date);
            if (this.state.dateCategory === category) {
              return (
                <div>{ recipe.name } &nbsp { recipe.due_date }</div>
              )
            }
          })}
        </ul>
      </div>
    );
  }
}

export default RecipeReminder;
