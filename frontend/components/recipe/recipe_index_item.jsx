import React from 'react';
import { Link } from 'react-router-dom';

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
          <img src={recipe.image_url} alt={recipe.name} />
        </Link>
      </div>
    );
  }
}

export default RecipeIndexItem;
