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
              <ul>
                <li>Servings: {recipe.serving}</li>
                <li>Rating: {recipe.rating}</li>
                <li>Description: {recipe.description}</li>
              </ul>
            </div>

            <div className="recipe detail content2">
              <section>
                <h3>Ingredients:</h3>
                <ul>{ this.strSplit(recipe.ingredients).map(line => {
                  return (<li>{ line }</li>)
                })}
                </ul>
              </section>

              <section>
                <h3>Directions:</h3>
                <ul>{ this.strSplit(recipe.directions).map(line => {
                  return (<li>{ line }</li>)
                })}
                </ul>
              </section>

              <section>Notes: {recipe.notes}</section>
              <section>Link: {recipe.link}</section>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default RecipeDetail;
