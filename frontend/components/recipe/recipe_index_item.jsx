import React from 'react';
import { Link, Route } from 'react-router-dom';

import RecipeDetailContainer from './recipe_detail_container';

class RecipeIndexItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const recipe = this.props.recipe;
    console.log("in recipe index item");
    console.log(recipe.id);
    return (
      <div className="recipe-info">
        <Link to={`/recipes/${recipe.id}`}>
          <div>{recipe.name}</div>
          <img src={recipe.image_url} />
        </Link>
        <Route exact path="/recipes/:id" component={ RecipeDetailContainer } />
      </div>
    );
  }
}

export default RecipeIndexItem;
