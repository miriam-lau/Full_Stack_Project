import React from "react";
import { Route, Link } from "react-router-dom";

import RecipeIndexContainer from "./recipe_index_container";
import RecipeUpdateContainer from "./recipe_update_container";

import merge from "lodash/merge";
import { FontIcon, TextField } from "material-ui/";
import { underlineFocusStyle, underlineStyle, itemStyleDefault, styles } from
    "../utils/material_ui_styles";

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openUpdate: false };

    this.strSplit = this.strSplit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.requestRecipe(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.requestRecipe(nextProps.match.params.id);
    }
  }

  /*
    Splits the html string on "\n".
    @param {string}
  */
  strSplit(str) {
    let strArray = str.split("\n");
    return strArray;
  }

  /*
    Toggles the open and close state of update form.
    @param {event}
  */
  handleUpdate(event) {
    this.setState({ openUpdate: !this.state.openUpdate });
  }

  /*
    On click, deletes the recipe.
    @param {event}
  */
  handleDelete(event) {
    const recipeId = parseInt(this.props.match.params.id);
    const recipe = this.props.recipe[recipeId];
    this.props.deleteRecipe(recipe.id).then( () => {
      this.props.history.push("/recipes");
    });
  }

  render() {
    const recipeId = parseInt(this.props.match.params.id);
    const recipe = this.props.recipe[recipeId];
    // if type recipes.recipe_id it will become a string literal, need index
    if (!recipe) return null;

    return (
      <div className="wrapper">
        <div>
          <img className="side-nav-img"
              src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447618/side_nav_recipe_c4agb9.png" alt="side-bar-img-recipe"
          />
        </div>

        {this.state.openUpdate ?
          <RecipeUpdateContainer
            recipe={ recipe }
            handleUpdate={ this.handleUpdate }
          /> :
          <div className="recipe-detail">
            <section className="recipe-link-wrapper">
              <Link className="recipe-link" to="/recipes">All Recipes</Link>
              <Route exact path="/recipes" component={ RecipeIndexContainer } />
            </section>

            <section className="recipe-detail-info">
              <h2>{ recipe.name }</h2>

              <div className="recipe-detail-choices">
                <section id="recipe-detail-icon-wrapper">
                  <div id="recipe-button-wrapper">
                    <i className="fa fa-pencil fa-lg" aria-hidden="true"
                        onClick={ this.handleUpdate }>
                    </i>
                  </div>

                  <div id="recipe-button-wrapper">
                    <i className="material-icons trash-can-recipe"
                        style={ styles } onClick={ this.handleDelete }>
                        delete_forever
                    </i>
                  </div>
                </section>
              </div>

              <div className="recipe-detail-content">
                <figure className="recipe-detail-img">
                  {recipe.image_url !== "" ?
                    <img src={ recipe.image_url } alt={ recipe.name }/> :
                    <img
                        src="http://res.cloudinary.com/miriam-lau/image/upload/c_scale,w_300/v1499837766/recipe_img_ifau7s.jpg"
                    />
                  }
                </figure>

                <section className="recipe-detail-content1">
                  <div className="recipe-subsection">
                    <div className="recipe-detail-title">Servings: </div>
                    <div className="recipe-detail-text1">
                      {recipe.serving === 0 ? "Not Specified" : recipe.serving}
                    </div>
                  </div>

                  <div className="recipe-subsection">
                    <div className="recipe-detail-title">Rating: </div>
                    <div className="recipe-detail-text1">
                      {recipe.rating === 0 ? "No Rating Yet" : recipe.rating}
                    </div>
                  </div>

                  <div className="recipe-subsection">
                    <div  className="recipe-detail-title">Website: </div>
                    <a href={ recipe.link }
                        className="recipe-detail-website">{ recipe.link }
                    </a>
                  </div>

                  <div className="recipe-detail-description-wrapper">
                    <h3 className="recipe-detail-title2">Description</h3>
                    <div className="recipe-detail-text2">{ recipe.description }
                    </div>
                  </div>
                </section>
              </div>

              <div className="recipe-detail-content2">
                <section className="recipe-detail-ingredients">
                  <h3 className="recipe-detail-title2">Ingredients</h3>
                  <ul>
                    {this.strSplit(recipe.ingredients).map((line, idx) => {
                      return (<li key={ idx }>{ line }</li>)
                    })}
                  </ul>
                </section>

                <section className="recipe-detail-directions">
                  <h3 className="recipe-detail-title2">Directions</h3>
                  <ul>
                    {this.strSplit(recipe.directions).map((line, idx) => {
                      return (<li key={ idx }>{ line }</li>)
                    })}
                  </ul>
                </section>
              </div>

              <section>
                <h3 className="recipe-detail-title2">Cooking Notes</h3>
                <div className="recipe-detail-text2">{ recipe.notes }</div>
              </section>
            </section>
          </div>
        }
      </div>
    );
  }
}

export default RecipeDetail;
