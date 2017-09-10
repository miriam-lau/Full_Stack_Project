import React from "react";
import { Route, Link } from "react-router-dom";

import RecipeReminderItemContainer from "./recipe_reminder_item_container";

// Recipe date categories
const recipeDates = ["Overdue", "Today", "This Week", "Coming Weeks"];

class RecipeReminders extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestAllRecipes();
  }

  render() {
    const recipes = this.props.recipes;
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
                  if (recipe.due_date != "none") {
                    return (
                      <RecipeReminderItemContainer
                        key = { recipe.id }
                        recipe = { recipe }
                      />
                    )
                  } else {
                    return (<span></span>)
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
