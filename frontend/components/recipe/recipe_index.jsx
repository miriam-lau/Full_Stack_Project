import React from 'react';
import { Route, Link } from 'react-router-dom';

import RecipeIndexItem from './recipe_index_item';

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
          <div className="recipe-one-add">
          </div>

          <div className="recipe-two-list-title">
            <section>
              <h2>Recipes</h2>
            </section>
          </div>

          <div className="recipe-three-list">
            <ul className="recipe-items">
              {recipes.map((item, idx) => {
                return (<RecipeIndexItem
                  key=idx
                  recipe={item}
                  recipe_id={item.id}
                  requestRecipe={this.props.requestRecipe}
                  removeRecipe={this.props.removeRecipe}
                  editRecipe={this.props.editRecipe}
                />)
              })}
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

export default RecipeIndex;
