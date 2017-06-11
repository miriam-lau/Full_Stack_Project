import React from 'react';

class RecipeForm extends React.component {
  render() {
    return (
      <div>
        <div>name</div>
        <div>serving</div>
        <div>nutrition</div>
        <div>rating</div>
        <div className="new-recipe">
          <h3>Description</h3>
        </div>
        <div>directions</div>
        <div>notes</div>
        <div>link</div>
      </div>
    )
  }
}

export default RecipeForm;
