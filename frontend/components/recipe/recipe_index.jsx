import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import RecipeIndexItem from "./recipe_index_item";
import RecipeDetailContainer from "./recipe_detail_container";

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
        <div className="recipe-wrapper">
          <div className="recipe-side-nav-bar">
            <img src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447618/side_nav_recipe_c4agb9.png" alt="side-bar-img-recipe" className="recipe-img"/>
          </div>

          <div className="recipe-list">
            <br />
            <Link className="recipe-link" to="/recipes/new">Add Recipe</Link>

            <section>
              <h2 className="recipe-title">Recipes</h2>
            </section>

            <div className="recipe-three-list">
              {this.props.recipes.map((item, idx) => {
                return (
                  <RecipeIndexItem
                    key={item.id}
                    recipe_id={item.id}
                    recipe={item}
                    requestRecipe={this.props.requestRecipe}
                    deleteRecipe={this.props.deleteRecipe}
                    updateRecipe={this.props.updateRecipe}
                  />
                )}
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeIndex;
