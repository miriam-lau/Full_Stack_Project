import React from "react";

class RecipeUpdate extends React.Component {
  constructor(props) {
    super(props);
    let recipe = this.props.recipe;
    this.state = { name: recipe.name, image_url: recipe.image_url,
        link: recipe.link, serving: recipe.serving, rating: recipe.rating, ingredients: recipe.ingredients, description: recipe.description, directions: recipe.directions, notes: recipe.notes};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
    On changes to property fields, it will update the state of that property.
    @param {property} property of the item
  */
  update(property) {
    let recipe = this.props.recipe;
    return e => {
      this.setState({ [property]: e.target.value });
    }
  }

  /*
    Passes the saved state to the updateRecipe action.
    @param {event} form submission
  */
  handleSubmit(event) {
    event.preventDefault();
    let recipe = this.props.recipe;

    let updatedRecipe = {
      id: recipe.id,
      name: this.state.name,
      image_url: this.state.image_url,
      link: this.state.link,
      serving: this.state.serving,
      rating: this.state.rating,
      ingredients: this.state.ingredients,
      description: this.state.description,
      directions: this.state.directions,
      notes: this.state.notes
    }

    this.props.updateRecipe({ recipe: updatedRecipe }).then( (recipe) => {
        this.props.history.push("/recipes");
        //should re-render show page but it doesn't work, cannot push to recipe id again- is there a way to re-render the show page?
      });
  }

  render() {
    const recipe = this.props.recipe;
    return (
      <form className="recipe-form" onSubmit={ this.handleSubmit }>
        <h2 className="recipe-form-title">Update Recipe</h2>

        <div className="recipe-form-section">
          <span className="recipe-form-section-name">Name</span>
          <input className="recipe-form-update-text" type="text"
              value={ this.state.name } onChange={ this.update("name") }
          />
        </div>

        <div className="recipe-form-section2">
          <div className="recipe-form-section">
            <span className="recipe-form-section-name">Image</span>
            {recipe.image_url ?
              <div className="recipe-form-img">
                <figure>
                  <div className="update-img-pic">
                    <img src={ this.state.image_url }
                        className="current-recipe-img"
                        alt={ recipe.name }
                    />
                  </div>
                  <input id="upload-img-file" type="file" accept="image/*" />
                </figure>
              </div> :
              <div className="recipe-form-img">
                <figure>
                  <div className="upload-img-text">Upload an Image</div>
                  <input id="upload-img-file" type="file" accept="image/*" />
                </figure>
              </div>
            }
          </div>

          <div className="recipe-form-subsection-wrapper">
            <div className="recipe-form-section">
              <span className="recipe-form-section-name">Servings</span>
              <input className="recipe-form-update-text" type="number"
                  value={ this.state.serving }
                  onChange={ this.update("serving") }
              />
            </div>
            <div className="recipe-form-section">
              <span className="recipe-form-section-name">Rating</span>
              <input className="recipe-form-update-text" type="number"
                  value={ this.state.rating } onChange={ this.update("rating") }
              />
            </div>
            <div className="recipe-form-section">
              <span className="recipe-form-section-name">Website</span>
              <textarea className="recipe-form-update-text" name="website"
                  value={ this.state.link } rows="2"
                  onChange={ this.update("link") }
              />
            </div>
            <div className="recipe-form-section">
              <span className="recipe-form-section-name">Description</span>
              <textarea className="recipe-form-update-text"
                  name="description" value={ this.state.description }
                  rows="3" onChange={ this.update("description") }
              />
            </div>
          </div>
        </div>

        <div className="recipe-form-section2">
          <div className="recipe-form-ingredients">
            <span className="recipe-form-section-name">Ingredients</span>
            <textarea className="recipe-form-update-text"
                name="ingredients" value={ this.state.ingredients }
                rows="15" onChange={ this.update("ingredients") }
            />
          </div>
          <div className="recipe-form-directions">
            <span className="recipe-form-section-name">Directions</span>
            <textarea className="recipe-form-update-text"
                name="directions" value={ this.state.directions }
                rows="15" onChange={ this.update("directions") }
            />
          </div>
        </div>

        <div className="recipe-form-section">
          <span className="recipe-form-section-name">Notes</span>
          <textarea className="recipe-form-update-text" name="notes"
              value={ this.state.notes } rows="3"
              onChange={ this.update("notes") }
          />
        </div>

        <div>
          <span></span>
          <button className="recipe-form-button">Update Recipe</button>
        </div>
      </form>
    )
  }
}

export default RecipeUpdate;
