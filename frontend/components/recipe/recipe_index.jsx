import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import {GridList, GridTile} from 'material-ui/GridList';

import Subheader from 'material-ui/Subheader';


import RecipeIndexItem from './recipe_index_item';
import RecipeDetailContainer from './recipe_detail_container';
import RecipeFormContainer from './recipe_form_container';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {

    width: 5000,
    height: 450,
    overflowY: 'auto',
  },
};

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
                    key={idx}
                    recipe_id={item.id}
                    recipe={item}
                    requestRecipe={this.props.requestRecipe}
                    removeRecipe={this.props.removeRecipe}
                    editRecipe={this.props.editRecipe}
                  />
                )}
              )}
            </div>
          </div>

          <div className="new-recipe">
            <Route path="/recipes/new" component={ RecipeFormContainer } />
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeIndex;
