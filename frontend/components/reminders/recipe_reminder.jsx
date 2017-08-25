import React from "react";
import { Route, Link } from "react-router-dom";

const recipeDates = ["Overdue", "Today", "This Week", "Coming Weeks"];

class RecipeReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dateCategory: "" };
    // this.displayDate = this.displayDate.bind(this);
  }

  componentWillMount() {
    this.props.requestAllRecipes();
  }

  // displayDate(due_date) {
  //   let moment = require("moment");
  //   let todayString = moment().format("MM-DD-YYYY");
  //   let todaySplit = todayString.split("-");
  //   let currentMonth = parseInt(todaySplit[0]);
  //   let currentDay = parseInt(todaySplit[1]);
  //   let currentYear = parseInt(todaySplit[2]);
  //   console.log("date");
  //   console.log(currentMonth);
  //   console.log(currentDay);
  //   console.log(currentYear);
  //
  //   let recipeDateSplit = due_date.split("-");
  //   let recipeMonth = parseInt(recipeDateSplit[0]);
  //   let recipeDay = parseInt(recipeDateSplit[1]);
  //   let recipeYear = parseInt(recipeDateSplit[2]);
  //
  //   if (recipeMonth === currentMonth && recipeYear === currentYear) {
  //     if (recipeDay === currentDay) {
  //       this.setState({ dateCategory: "Today" });
  //     } else if (recipeDay <= (currentDay + 7)) {
  //       this.setState({ dateCategory: "This Week" });
  //     }
  //   } else if (recipeMonth < currentMonth || recipeYear < currentYear ||
  //       (recipeMonth === currentMonth && recipeDay < currentDay)) {
  //     this.setState({ dateCategory: "Overdue" });
  //   } else {
  //     this.setState({ dateCategory: "Coming Weeks" });
  //   }
  // }

  render() {
    const recipes = this.props.recipes;
    console.log(recipes);

    return (
      <div>
        <section>
          <h2 className="planned-recipes-title">Planned Recipes</h2>
        </section>

        {recipeDates.map((category, idx) => {
          return (
            <div key={ idx } className="purchased-grocery-category-section">
              <h3 className="index-category reminder-index-category">
                { category }
              </h3>

              <ul className="reminder-items">
                {this.props.recipes.map((recipe) => {

                  if (this.state.dateCategory === category) {
                    return (
                      <div>{ recipe.name } &nbsp { recipe.due_date }</div>
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

export default RecipeReminder;

// line 67, may need a callback for function below?
// this.displayDate(recipe.due_date);
