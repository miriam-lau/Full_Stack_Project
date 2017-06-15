import React from 'react';
import { Link, Route } from 'react-router-dom';

import RecipeDetailContainer from './recipe_detail_container';

class RecipeIndexItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const recipe = this.props.recipe;
    return (
      <div className="recipe-info">
        <Link to={`/recipes/${recipe.id}`}>
          <div>{recipe.name}</div>
          <img src={recipe.image_url} />
        </Link>
      </div>
    );
  }
}

export default RecipeIndexItem;
