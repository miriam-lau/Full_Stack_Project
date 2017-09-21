import React from "react";

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", image_url: "", link: "", serving: "",
      rating: "", ingredients: "", description: "", directions: "", notes: ""};
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
          <img src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447618/side_nav_recipe_c4agb9.png" alt="side-bar-img-recipe" className="side-nav-img"/>
        </div>

        <form className="recipe-form" onSubmit={this.handleSubmit}>
          <h2 className="new-recipe-title">New Recipe</h2>

          <section className="recipe-form-input">
            <div>
              <span>Name</span>
              <input className="input-field" type="text"
                  value={ this.state.name } placeholder="Recipe Name" onChange={ this.update("name") } />
            </div>

            <div className="recipe-form-part1">
              <div className="recipe-form-part4">
                <span>Image</span>
                <div className="update-recipe-img">
                  <figure>
                    <div className="upload-img-text">
                        Upload an Image
                    </div>
                    <input id="upload-img-file" type="file" accept="image/*"/>
                  </figure>
                </div>
              </div>

              <div className="recipe-form-part3">
                <div className="recipe-form-part2">
                  <span>Servings</span>
                  <input className="input-field" type="number" min="0"
                      value={ this.state.serving }
                      placeholder="Number of Servings"
                      onChange={ this.update("serving") }
                  />
                </div>

                <div className="recipe-form-part2">
                  <span>Rating</span>
                  <input className="input-field" type="number" min="0" max="10"
                      value={ this.state.rating }
                      placeholder="Rating from 1 to 10"
                      onChange={ this.update("rating") }
                  />
                </div>

                <div className="recipe-form-part2">
                  <span>Website</span>
                  <textarea className="input-field-description" type="text"
                      value={ this.state.link } rows="2" placeholder="URL"
                      onChange={ this.update("link") }
                  />
                </div>

                <div className="recipe-form-part2">
                  <span>Description</span>
                  <textarea className="input-field-description"
                      value={ this.state.description }
                      placeholder="Short Description" rows="3"
                      onChange={ this.update("description") }
                  />
                </div>

              </div>
            </div>

            <div>
              <span>Ingredients</span>
              <textarea className="recipe-form-part5"
                  value={ this.state.ingredients }
                  placeholder="List Ingredients (Separate each ingredient with
                      a new line)" rows="11"
                  onChange={ this.update("ingredients") }
              />
            </div>

            <div>
              <span>Directions</span>
              <textarea className="recipe-form-part5"
                  value={ this.state.directions }
                  placeholder="List Directions (Separate each direction with a
                      new line)" rows="11"
                  onChange={ this.update("directions") }
              />
            </div>
            <div>
              <span>Notes</span>
              <textarea className="recipe-form-part5" value={ this.state.notes }
                  placeholder="Cooking Notes" rows="3"
                  onChange={ this.update("notes") }
              />
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
