import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import RecipeIndexItem from "./recipe_index_item";
import RecipeDetailContainer from "./recipe_detail_container";
import RecipeFormContainer from "./recipe_form_container";

class RecipeIndex extends React.Component {
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
        <div className="wrapper">
          <div>
            <img className="side-nav-img"
                src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447618/side_nav_recipe_c4agb9.png" alt="side-bar-img-recipe"
            />
          </div>

          <div className="recipe-index">
            <section className="recipe-link-wrapper">
              <Link className="recipe-link" to="/recipes/new">Add Recipe</Link>
              <Route exact path="/recipes/new"
                  component={ RecipeFormContainer }
              />
            </section>

            <h2 className="recipe-title">Recipes</h2>

            <div className="recipe-list">
              {this.props.recipes.map((item) => {
                return (
                  <RecipeIndexItem
                    key={ item.id }
                    recipe={ item }
                  />
                )}
              )}
            </div>
          </div>
        </div>
        <Route path="/recipes/:recipeId" component={ RecipeDetailContainer } />
      </div>
    );
  }
}

export default RecipeIndex;
