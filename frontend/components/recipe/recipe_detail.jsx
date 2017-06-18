import React from 'react';
import { Route, Link } from 'react-router-dom';

import RecipeIndexContainer from './recipe_index_container';

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.strSplit = this.strSplit.bind(this);
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
    let strArray = str.split('\n');
    console.log(strArray);
    return strArray;
  }

  render() {
    const recipe_id = parseInt(this.props.match.params.id);
    const recipes = this.props.recipes;
    // if type recipes.recipe_id it will become a string literal, need index
    const recipe = recipes[recipe_id];
    if (!recipes) return null;

    return (
      <div className="recipe-detail-wrapper">
        <div className="recipe-detail">
          <Link className="recipe-link" to="/recipes">Back to Recipes</Link>
          <Route exact path="/recipes" component={ RecipeIndexContainer } />

          <section className="recipe-detail-info">
            <h2>{recipe.name}</h2>
            <div className="recipe-detail-content">
              <figure>
                <img src={recipe.image_url} alt={recipe.name}
                  className="recipe-detail-img"/>
              </figure>
              <section className="recipe-detail-content1">
                <p>
                  <span className="recipe-detail-title">Servings:</span> {recipe.serving}
                </p>

                <p>
                  <span className="recipe-detail-title">Rating:</span> {recipe.rating}
                </p>

                <h3 className="recipe-detail-title">Description:</h3>
                <p>{recipe.description}</p>

                <p>
                  <span className="recipe-detail-title">Link:</span> {recipe.link}
                </p>
              </section>
            </div>

            <div className="recipe-detail-content1">
              <section>
                <h3 className="recipe-detail-title">Ingredients:</h3>
                <ul>{ this.strSplit(recipe.ingredients).map(line => {
                  return (<li>{ line }</li>)
                })}
                </ul>
              </section>

              <section>
                <h3 className="recipe-detail-title">Directions:</h3>
                <ul>{ this.strSplit(recipe.directions).map(line => {
                  return (<li>{ line }</li>)
                })}
                </ul>
              </section>

              <section>
                <h3 className="recipe-detail-title">Notes:</h3> <p>{recipe.notes}</p>
              </section>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default RecipeDetail;
