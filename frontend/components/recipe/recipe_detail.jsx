import React from "react";
import { Route, Link } from "react-router-dom";

import RecipeIndexContainer from "./recipe_index_container";
import { FontIcon } from "material-ui/";
import { styles } from "../utils/material_ui_styles";

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.strSplit = this.strSplit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    console.log("hello");
  }

  render() {
    const recipe_id = parseInt(this.props.match.params.id);
    const recipes = this.props.recipes;
    // if type recipes.recipe_id it will become a string literal, need index
    const recipe = recipes[recipe_id];
    if (!recipes) return null;

    return (
      <div className="recipe-detail-wrapper">
        <div className="recipe-detail-nav-bar"></div>
        <div className="recipe-detail">
          <div className="recipe-detail-options">
            <section>
              <Link className="recipe-link" to="/recipes">Back to Recipes</Link>
              <Route exact path="/recipes" component={ RecipeIndexContainer } />
            </section>

            <section>
              <i className="fa fa-pencil fa-lg" aria-hidden="true"
                  onClick={ this.handleClick }>
              </i>
            </section>

            <section>
              <i className="material-icons trash-can"
                  style={styles}
                  onClick={ () => this.props.deletePantryItem(pantryItem.id) }>
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
                <p>
                  <span className="recipe-detail-title">SERVINGS: </span> {recipe.serving}
                </p>

                <p>
                  <span className="recipe-detail-title">RATING: </span> {recipe.rating}
                </p>

                <h3 className="recipe-detail-title">DESCRIPTION</h3>
                <p>{recipe.description}</p>

                <p>
                  <span className="recipe-detail-title">LINK: </span> <a href={recipe.link} className="recipe-detail-link">{recipe.link}</a>
                </p>
              </section>
            </div>

            <div className="recipe-detail-content2">
              <section className="ingredients">
                <h3 className="recipe-detail-title">INGREDIENTS</h3>
                <ul>{ this.strSplit(recipe.ingredients).map(line => {
                  return (<li>{ line }</li>)
                })}
                </ul>
              </section>

              <section className="directions">
                <h3 className="recipe-detail-title">DIRECTIONS</h3>
                <ul>{ this.strSplit(recipe.directions).map(line => {
                  return (<li>{ line }</li>)
                })}
                </ul>
              </section>

            </div>

            <section>
              <h3 className="recipe-detail-title">NOTES</h3>
              <p className="recipe-detail-last-section">{recipe.notes}
              </p>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default RecipeDetail;
