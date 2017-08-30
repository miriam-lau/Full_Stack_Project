import React from "react";
import { Route, Link } from "react-router-dom";

import RecipeReminderItem from "./recipe_reminder_item";

const recipeDates = ["Overdue", "Today", "This Week", "Coming Weeks"];

class RecipeReminders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dateCategory: "" };
  }

  componentWillMount() {
    this.props.requestAllRecipes();
  }

  render() {
    const recipes = this.props.recipes;
    console.log(recipes);
    // renders empty lines of recipes with no due date initially
    // on refresh it displays one more than than ones with due date

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
                  if (recipe.due_date !== "") {
                    return ( <RecipeReminderItem
                      key = { recipe.id }
                      recipe = { recipe }
                      updateRecipe = { this.props.updateRecipe } />
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

export default RecipeReminders;
