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
    this.props.createRecipe({recipe})
      .then(data => this.props.history.push(`/recipes/${recipe.id}`));
  }

  render() {
    return (
      <div>
        <div className="recipe-form-nav-bar"></div>
        <form className="recipe-form" onSubmit={this.handleSubmit}>
          <div className="new-recipe-title">
            <h2>New Recipe</h2>
          </div>
          <section className="recipe-form-input">
            <div>
              <span>Name</span>
              <input type="text" value={this.state.name} placeholder="Name"
                onChange={this.update('name')} />
            </div>

            <div className="recipe-form-part1">
              <div className="recipe-form-part4">
                <span>Image</span>
                <div className="upload-img">
                  <label className="upload-file">Upload an Image</label>
                  <input id="file" type="file" accept="image/*" />
                </div>
              </div>
              <div className="recipe-form-part3">
                <div className="recipe-form-part2">
                  <span>Servings</span>
                  <input className="input-field" type="number" value={this.state.serving} placeholder="Number of Servings"
                    onChange={this.update('serving')} />
                </div>
                <div className="recipe-form-part2">
                  <span>Rating</span>
                  <input className="input-field" type="number" value={this.state.rating} placeholder="Stars"
                    onChange={this.update('rating')} />
                </div>
                <div className="recipe-form-part2">
                  <span>Website</span>
                  <input className="input-field" type="text" value={this.state.link} placeholder="URL"
                    onChange={this.update('link')} />
                </div>
              </div>
            </div>

            <div>
              <span>Description</span>
              <textarea name="description" value={this.state.description}
                placeholder="Short Description" rows="3"
                onChange={this.update('description')} />
            </div>

            <div>
              <span>Ingredients</span>
              <textarea name="ingredients" value={this.state.ingredients}
                placeholder="Ingredients" rows="7"
                onChange={this.update('ingredients')} />
            </div>

            <div>
              <span>Directions</span>
              <textarea name="directions" value={this.state.directions}
                placeholder="Directions" rows="7"
                onChange={this.update('directions')} />
            </div>
            <div>
              <span>Notes</span>
              <textarea name="notes" value={this.state.notes}
                placeholder="Cooking Notes" rows="3"
                onChange={this.update('notes')} />
            </div>

            <div>
              <span></span>
              <button className="recipe-form-button">Save Recipe</button>
            </div>
          </section>

        </form>
      </div>
    )
  }
}

export default RecipeForm;
