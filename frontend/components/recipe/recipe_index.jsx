import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import RecipeIndexItem from './recipe_index_item';
import RecipeDetailContainer from './recipe_detail_container';
import RecipeFormContainer from './recipe_form_container';

class RecipeIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestAllRecipes();
  }

  render() {
    console.log("in recipe index render");
    const recipes = this.props.recipes;
    return (
      <div>
        <div className="recipe-wrapper">
          <div className="recipe-list">
            <section>
              <h2 className="recipe-title">Recipes</h2>
            </section>

            <div className="recipe-three-list">
              <ul className="recipe-items">
                {this.props.recipes.map((item, idx) => {
                  return (<RecipeIndexItem
                    key={idx}
                    recipe_id={item.id}
                    recipe={item}
                    requestRecipe={this.props.requestRecipe}
                    removeRecipe={this.props.removeRecipe}
                    editRecipe={this.props.editRecipe}
                  />)
                })}
              </ul>
            </div>
          </div>
          
          <Route exact path="/recipes/:id" component={ RecipeDetailContainer } />

          <div className="new-recipe">
            <Route path="/recipes" component={ RecipeFormContainer } />
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeIndex;
