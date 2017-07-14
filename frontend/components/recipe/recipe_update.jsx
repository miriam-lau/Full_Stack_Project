import React from "react";
import merge from "lodash/merge";

class RecipeUpdate extends React.Component {
  constructor(props) {
    super(props);
    let recipe = this.props.recipe;
    this.state = { name: recipe.name, image_url: recipe.image_url,
        link: recipe.link, serving: recipe.serving, rating: recipe.rating, ingredients: recipe.ingredients, description: recipe.description, directions: recipe.directions, notes: recipe.notes};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    let recipe = this.props.recipe;
    return e => {
      // recipe[property] = e.target.value;
      this.setState({ [property]: e.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let recipe = this.props.recipe;
    // let updatedRecipe = merge({}, this.state);
    // console.log(recipe.id);
    // updatedRecipe[id] = recipe.id;


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
    console.log(updatedRecipe);
    this.props.updateRecipe({ recipe: updatedRecipe })
      .then(recipe => this.props.history.push(`/recipes/${recipe.id}`));
  }

  render() {
    const recipe = this.props.recipe;
    return (
      <div>
        <div className="recipe-form-nav-bar"></div>
        <form className="recipe-update-form" onSubmit={ this.handleSubmit }>
          <div className="update-recipe-info">
            <input className="update-recipe-name" type="text"
                value={this.state.name} onChange={ this.update("name") } />

            <div className="update-recipe-content">
              {recipe.image_url ?
                <div className="update-recipe-img">
                  <figure>
                    <div className="update-img-text">
                      <img src={ this.state.image_url }
                          className="current-recipe-img"
                          alt={ recipe.name } />
                    </div>
                    <input id="upload-img-file" type="file" accept="image/*" />

                  </figure>
                </div> :
                <div className="update-recipe-img">
                  <figure>
                    <div className="upload-img-text-default">Upload an Image</div>
                    <input id="upload-img-file" type="file" accept="image/*" />
                  </figure>
                </div>
              }

              <div className="update-recipe-content1">
                <div className="update-recipe-1">
                  <div className="update-recipe-title">SERVINGS: </div>
                  <input className="update-input-field" type="number"
                      value={ this.state.serving }
                      onChange={ this.update("serving") }
                  />
                </div>

                <div className="update-recipe-1">
                  <div className="update-recipe-title">RATING: </div>
                  <input className="update-input-field" type="number"
                      value={ this.state.rating } onChange={ this.update("rating") }
                  />
                </div>

                <div className="update-recipe-1">
                  <div className="update-recipe-title">WEBSITE: </div>
                  <textarea className="update-input-website" name="website"
                      value={ this.state.link } rows="2"
                      onChange={ this.update("link") }
                  />
                </div>

                <div>
                  <h3 className="update-description-title">DESCRIPTION</h3>
                  <textarea className="update-input-textarea"
                      name="description" value={ this.state.description }
                      rows="3" onChange={ this.update("description") }
                  />
                </div>
              </div>
            </div>

            <div className="update-recipe-2">
              <div>
                <h3 className="update-title2">INGREDIENTS</h3>
                <textarea className="update-input-ingredients"
                    name="ingredients" value={ this.state.ingredients }
                    rows="15" onChange={ this.update("ingredients") }
                />
              </div>

              <div className="update-directions-div">
                <h3 className="update-title2">DIRECTIONS</h3>
                <textarea className="update-input-directions"
                    name="directions" value={ this.state.directions }
                    rows="15" onChange={ this.update("directions") }
                />
              </div>

            </div>

            <div>
              <h3 className="update-title3">NOTES</h3>
              <textarea className="update-input-notes" name="notes"
                  value={ this.state.notes } rows="3"
                  onChange={ this.update("notes") }
              />
            </div>

            <div>
              <span></span>
              <button className="update-recipe-form-button">Update Recipe</button>
            </div>
          </div>

        </form>
      </div>
    )
  }
}

export default RecipeUpdate;

// <input className="update-recipe-name" type="text"
//     value={recipe.name} onChange={ this.update("name") } />
