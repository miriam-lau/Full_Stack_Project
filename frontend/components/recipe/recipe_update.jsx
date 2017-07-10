import React from "react";

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    let recipe = this.props.recipe;
    this.state = { name: recipe.name, image_url: recipe.image_url,
        link: recipe.link, serving: recipe.serving, rating: recipe.rating, ingredients: recipe.ingredients, description: recipe.description, directions: recipe.directions, notes: recipe.notes};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleImageUpload(event) {
    console.log("in recipe image upload");
    <input id="file" type="file" accept="image/*" />
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("in hanlde submit");
    const recipe = this.state;
    // this.props.createRecipe({recipe})
    //   .then(data => this.props.history.push(`/recipes/${recipe.id}`));
  }

  render() {
    const recipe = this.props.recipe;
    return (
      <div>
        <div className="recipe-form-nav-bar"></div>
        <form className="recipe-update-form" onSubmit={this.handleSubmit}>
          <div className="update-recipe-info">
            <input className="update-recipe-name" type="text"
                value={recipe.name} onChange={this.update("name")} />

            <div className="update-recipe-content">
              {recipe.image_url ?
                <div className="update-recipe-img">
                  <figure onClick={ this.handleImageUpload} >
                    <div>Upload a New Image</div>
                    <img src={recipe.image_url} className="current-recipe-img"
                        alt={recipe.name} />
                  </figure>
                </div> :
                <div className="update-recipe-img">
                  <figure>
                    <label className="upload-file">Upload an Image</label>
                    <input id="file" type="file" accept="image/*" />
                  </figure>
                </div>
              }

              <div className="update-recipe-content1">
                <div className="update-recipe-1">
                  <div className="update-recipe-title">SERVINGS: </div>
                  <input className="update-input-field" type="number"
                      value={recipe.serving}
                      onChange={this.update("serving")}
                  />
                </div>

                <div className="update-recipe-1">
                  <div className="update-recipe-title">RATING: </div>
                  <input className="update-input-field" type="number"
                      value={recipe.rating} onChange={this.update("rating")}
                  />
                </div>

                <div className="update-recipe-1">
                  <div className="update-recipe-title">WEBSITE: </div>
                  <textarea className="update-input-website" name="website"
                      value={recipe.link} rows="2" onChange={this.update("link")}
                  />
                </div>

                <div>
                  <h3 className="update-description-title">DESCRIPTION</h3>
                  <textarea className="update-input-textarea"
                      name="description" value={recipe.description}
                      rows="3" onChange={this.update("description")}
                  />
                </div>
              </div>
            </div>

            <div className="update-recipe-2">
              <div>
                <h3 className="update-title2">INGREDIENTS</h3>
                <textarea className="update-input-ingredients"
                    name="ingredients" value={recipe.ingredients}
                    rows="15" onChange={this.update("ingredients")}
                />
              </div>

              <div className="update-directions-div">
                <h3 className="update-title2">DIRECTIONS</h3>
                <textarea className="update-input-directions"
                    name="directions" value={recipe.directions}
                    rows="15" onChange={this.update("directions")}
                />
              </div>

            </div>

            <div>
              <h3 className="update-title3">NOTES</h3>
              <textarea className="update-input-notes" name="notes"
                  value={recipe.notes} rows="3"
                  onChange={this.update("notes")}
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

export default RecipeForm;
