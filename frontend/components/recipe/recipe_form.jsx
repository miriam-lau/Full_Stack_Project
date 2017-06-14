import React from 'react';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="recipe-form" onSubmit={this.handleSubmit}>
        <label className="recipe-form-label">Add New Recipe</label>
        <br />

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
      </form>
    )
  }
}

export default RecipeForm;





// <TextField id="text-field-default"
// value={this.state.temp}
// underlineFocusStyle ={textboxUnderlineStyle}
// style={addItemTextBoxStyle}
// hintText="e.g. '2 Oranges' or '3 cups Milk'"
// onChange={this.update('temp')}
// />
