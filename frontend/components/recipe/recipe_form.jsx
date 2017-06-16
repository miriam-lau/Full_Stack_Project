import React from 'react';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', image_url: '', link: '', serving: 0,
      rating: 0, ingredients: '', description: '', directions: '', notes: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const recipe = this.state;
    console.log("in recipe form");
    console.log(this.state);
    this.props.createRecipe({recipe})
      .then(data => this.props.history.push(`/recipes/${recipe.id}`));
  }

  render() {
    return (
      <form className="recipe-form" onSubmit={this.handleSubmit}>
        <h2 className="recipe-title">Add New Recipe</h2>
        <section className="recipe-form-input">
          <div>
            <span>Recipe Name</span>
            <input type="text" value={this.state.name} placeholder="Name"
              onChange={this.update('name')} />
          </div>
          <div>
            <span>Recipe Image</span>
            <div className="upload-img">
              <input type="file" accept="image/*" name="Upload an Image" />
            </div>
          </div>
          <div>
            <span>Website URL</span>
            <input type="text" value={this.state.link} placeholder="URL"
              onChange={this.update('link')} />
          </div>
          <div>
            <span>Servings</span>
            <input type="number" value={this.state.serving} placeholder="Number of Servings"
              onChange={this.update('serving')} />
          </div>
          <div>
            <span>Rating</span>
            <input type="number" value={this.state.rating} placeholder="Stars"
              onChange={this.update('rating')} />
          </div>
          <div>
            <span>Ingredients</span>
            <textarea name="ingredients" value={this.state.ingredients}
              placeholder="Ingredients" rows="5"
              onChange={this.update('ingredients')} />
          </div>
          <div>
            <span>Short Description</span>
            <textarea name="description" value={this.state.description}
              placeholder="Description" rows="5"
              onChange={this.update('description')} />
          </div>
          <div>
            <span>Directions</span>
            <textarea name="directions" value={this.state.directions}
              placeholder="Directions" rows="10"
              onChange={this.update('directions')} />
          </div>
          <div>
            <span>Cooking Notes</span>
            <textarea name="notes" value={this.state.notes}
              placeholder="Notes" rows="5"
              onChange={this.update('notes')} />
          </div>

          <div>
            <span></span>
            <button className="recipe-form-button">Save Recipe</button>
          </div>
        </section>

      </form>
    )
  }
}

export default RecipeForm;
