import React from 'react';
import { Divider, Paper, TextField } from 'material-ui';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', image_url: '', link: '', serving: 0,
      rating: 0, description: '', directions: '', notes: ''}
  }

  update(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  render() {
    return (
      <form className="recipe-form" onSubmit={this.handleSubmit}>
        <h2 className="recipe-form-label">Add New Recipe</h2>
        <section className="recipe-form-input">
          <div>
            <span>Recipe Name</span>
            <input type="text" value={this.state.name} placeholder="Name"
              onChange={this.update('name')} />
          </div>
          <div>
            <span>Recipe Image</span>
            <input type="file" accept="image/*" placeholder="Upload an image"
              styles="display: none;" />
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
            <span>Short Description</span>
            <input type="text" value={this.state.description} placeholder="Description"
              onChange={this.update('description')} />
          </div>
          <div>
            <span>Directions</span>
            <input type="text" value={this.state.directions} placeholder="Directions"
              onChange={this.update('directions')} />
          </div>
          <div>
            <span>Cooking Notes</span>
            <input type="text" value={this.state.notes} placeholder="Notes"
              onChange={this.update('notes')} />
          </div>

          <div>
            <span>Save Recipe</span>
            <button>Save Recipe</button>
          </div>
        </section>

      </form>
    )
  }
}

export default RecipeForm;
