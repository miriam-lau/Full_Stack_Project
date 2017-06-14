import React from 'react';

class RecipeIndexItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const recipe = this.props.recipe;
    return (
      <div>
        <div>{recipe.name}</div>
        <div>Servings: {recipe.serving}</div>
        <div>Nutrition: {recipe.nutrition}</div>
        <div>Rating: {recipe.rating}</div>
        <div>Description: {recipe.description}</div>
        <div>Directions: {recipe.directions}</div>
        <div>Notes: {recipe.notes}</div>
        <div>Link: {recipe.link}</div>
      </div>
    );
  }
}

export default RecipeIndexItem;
