import React from "react";
import { Route, Link } from "react-router-dom";

import RecipeIndexContainer from "./recipe_index_container";
import RecipeUpdateContainer from "./recipe_update_container";
import { FontIcon, TextField } from "material-ui/";
import { underlineFocusStyle, underlineStyle, itemStyleDefault, styles } from
    "../utils/material_ui_styles";

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openUpdate: false };
    this.strSplit = this.strSplit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.props.requestRecipe(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.requestRecipe(nextProps.match.params.id);
    }
  }

  strSplit(str) {
    let strArray = str.split("\n");
    return strArray;
  }

  handleUpdate(event) {
    this.setState({ openUpdate: !this.state.openUpdate });
  }

  handleDateClick(event) {
    event.preventDefault();
    console.log("hello1");
  }

  render() {
    const recipeId = parseInt(this.props.match.params.id);
    const recipe = this.props.recipe[recipeId];
    // if type recipes.recipe_id it will become a string literal, need index
    if (!recipe) return null;

    return (
      <div className="recipe-wrapper">
        <div className="recipe-detail-nav-bar"></div>
        <div>
          {this.state.openUpdate ?
            <RecipeUpdateContainer recipe={ recipe } /> :
            <div className="recipe-detail">
              <div className="recipe-detail-options">
                <section id="link-to-recipes">
                  <Link className="recipe-link" to="/recipes">
                      Back to Recipes
                  </Link>
                  <Route exact path="/recipes"
                      component={ RecipeIndexContainer }
                  />
                </section>

                <section>
                  <i className="fa fa-calendar fa-lg" aria-hidden="true"
                      onClick={ this.handleDateClick }>
                  </i>
                </section>

                <section>
                    <i className="fa fa-pencil fa-lg" aria-hidden="true"
                        onClick={ this.handleUpdate }>
                    </i>
                </section>

                <section>
                  <i className="material-icons trash-can-recipe"
                      style={styles}
                      onClick={ () => this.props.deleteRecipe(recipe.id) }>
                      delete_forever
                  </i>
                </section>
              </div>

              <section className="recipe-detail-info">
                <h2>{recipe.name}</h2>
                <div className="recipe-detail-content">
                  <figure className="recipe-detail-img">
                    <img src={recipe.image_url} alt={recipe.name} />
                  </figure>

                  <section className="recipe-detail-content1">
                    <div>
                      <span className="recipe-detail-title">SERVINGS: </span> <span>{recipe.serving}</span>
                    </div>

                    <div>
                      <span className="recipe-detail-title">RATING: </span> <span>{recipe.rating}</span>
                    </div>

                    <div>
                      <h3 className="recipe-detail-title">DESCRIPTION</h3>
                      {recipe.description}
                    </div>

                    <div>
                      <span  className="recipe-detail-title">WEBSITE: </span>
                      <a href={recipe.link}
                          className="recipe-detail-link">{recipe.link}
                      </a>
                    </div>
                  </section>
                </div>

                <div className="recipe-detail-content2">
                  <section className="ingredients">
                    <h3 className="recipe-detail-title">INGREDIENTS</h3>
                    <ul>{ this.strSplit(recipe.ingredients).map((line, idx) => {
                      return (<li key={ idx }>{ line }</li>)
                    })}
                    </ul>
                  </section>

                  <section className="directions">
                    <h3 className="recipe-detail-title">DIRECTIONS</h3>
                    <ul>{ this.strSplit(recipe.directions).map((line, idx) => {
                      return (<li key={ idx }>{ line }</li>)
                    })}
                    </ul>
                  </section>

                </div>

                <section>
                  <h3 className="recipe-detail-title">NOTES</h3>
                  <div> className="recipe-detail-last-section">{recipe.notes}
                  </div>
                </section>
              </section>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default RecipeDetail;
