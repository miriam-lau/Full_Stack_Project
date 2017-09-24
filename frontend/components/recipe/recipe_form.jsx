import React from "react";

/*
  Returns error message if "shouldShow" is true.
  @param {props} if true props.message is passed in
*/
function ErrorBanner(props) {
  if (props.shouldShow) {
    return (
      <div className="recipe-add-item-error">{ props.message }</div>
    );
  }
  return null;
}

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", image_url: "", link: "", serving: "",
      rating: "", ingredients: "", description: "", directions: "", notes: "", errors: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
    On changes to property fields, it will update the state of that property.
    @param {property} property of the item
  */
  update(property) {
    return event => {
      this.setState({ [property]: event.target.value });
    }
  }

  /*
    Passes the saved state to the createRecipe action.
    @param {event} form submission
  */
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.name === "") {
      this.setState({ errors: true });
      return;
    }

    let newRecipe = {
      name: this.state.name,
      image_url: this.state.image_url,
      link: this.state.link,
      serving: parseInt(this.state.serving),
      rating: parseFloat(this.state.rating),
      ingredients: this.state.ingredients,
      description: this.state.description,
      directions: this.state.directions,
      notes: this.state.notes,
      due_date: "none"
    }

    this.props.createRecipe({ recipe: newRecipe }).then( (recipe) => {
          this.props.history.push(`/recipes/${recipe.recipe.id}`)
      });
  }

  render() {
    return (
      <div className="wrapper">
        <div>
          <img className="side-nav-img"
              src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447618/side_nav_recipe_c4agb9.png" alt="side-bar-img-recipe" />
        </div>

        <form className="recipe-form" onSubmit={ this.handleSubmit }>
          <h2 className="recipe-form-title">New Recipe</h2>

          <div className="recipe-form-section">
            <span className="recipe-form-section-name">Name</span>
            <input className="recipe-form-placeholder-text" type="text"
                value={ this.state.name } placeholder="Recipe Name"
                onChange={ this.update("name") }
            />
          </div>

          <div className="recipe-form-section2">
            <div className="recipe-form-section">
              <span className="recipe-form-section-name">Image</span>
              <div className="recipe-form-img">
                <figure>
                  <div className="upload-img-text">Upload an Image</div>
                  <input id="upload-img-file" type="file" accept="image/*"/>
                </figure>
              </div>
            </div>

            <div className="recipe-form-subsection-wrapper">
              <div className="recipe-form-section">
                <span className="recipe-form-section-name">Servings</span>
                <input className="recipe-form-placeholder-text"
                    type="number" min="0" value={ this.state.serving }
                    placeholder="Number of Servings"
                    onChange={ this.update("serving") }
                />
              </div>
              <div className="recipe-form-section">
                <span className="recipe-form-section-name">Rating</span>
                <input className="recipe-form-placeholder-text"
                    type="number" min="0" max="10" value={ this.state.rating }
                    placeholder="Rating from 1 to 10"
                    onChange={ this.update("rating") }
                />
              </div>
              <div className="recipe-form-section">
                <span className="recipe-form-section-name">Website</span>
                <textarea className="recipe-form-placeholder-text" type="text"
                    value={ this.state.link } rows="2" placeholder="URL"
                    onChange={ this.update("link") }
                />
              </div>
              <div className="recipe-form-section">
                <span className="recipe-form-section-name">Description</span>
                <textarea className="recipe-form-placeholder-text"
                    value={ this.state.description }
                    placeholder="Short Description" rows="3"
                    onChange={ this.update("description") }
                />
              </div>
            </div>
          </div>

          <div className="recipe-form-section2">
            <div className="recipe-form-ingredients">
              <span className="recipe-form-section-name">Ingredients</span>
              <textarea className="recipe-form-placeholder-text"
                  value={ this.state.ingredients }
                  placeholder="List Ingredients (Separate each ingredient with
                      a new line)" rows="11"
                  onChange={ this.update("ingredients") }
              />
            </div>
            <div className="recipe-form-directions">
              <span className="recipe-form-section-name">Directions</span>
              <textarea className="recipe-form-placeholder-text"
                  value={ this.state.directions }
                  placeholder="List Directions (Separate each direction with a
                      new line)" rows="11"
                  onChange={ this.update("directions") }
              />
            </div>
          </div>

          <div className="recipe-form-section">
            <span className="recipe-form-section-name">Notes</span>
            <textarea className="recipe-form-placeholder-text"
                value={ this.state.notes } placeholder="Cooking Notes" rows="3"
                onChange={ this.update("notes") }
            />
          </div>

          <ErrorBanner shouldShow={ this.state.errors }
              message="Invalid entry. Recipe must have name."
          />

          <div>
            <button className="recipe-form-button">Save Recipe</button>
          </div>
        </form>
      </div>
    )
  }
}

export default RecipeForm;
