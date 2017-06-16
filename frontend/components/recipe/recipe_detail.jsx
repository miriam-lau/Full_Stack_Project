import React from 'react';
import { Route, Link } from 'react-router-dom';
import RecipeIndexContainer from './recipe_index_container';

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    console.log("in recipe detail constructor");
    const obj_id = this.props.match.params.id;
    let is_id = typeof obj_id === "number";
    console.log(is_id);
    console.log(this.props.recipes);
    console.log(obj_id);
    console.log(this.props.recipes.obj_id);
    const { one, two } = this.props.recipes;
    console.log("try one");
    console.log(one);
  }

  componentDidMount() {
    console.log("in recipe detail component did mount");
    console.log(this.props.match.params.id);
    this.props.requestRecipe(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.requestRecipe(nextProps.match.params.id);
    }
  }

  render() {
    const recipe_id = parseInt(this.props.match.params.id);
    const recipes = this.props.recipes;
    const recipe = recipes[recipe_id];
    if (!recipes) return null;
    console.log("in recipe detail render");
    console.log(recipes);
    console.log(recipe_id);
    console.log(recipe.name);

    return (
      <div className="recipe-detail-wrapper">
        <div className="recipe-detail">
          <Link className="recipe-link" to="/recipes">Back to Recipes</Link>
          <Route exact path="/recipes" component={ RecipeIndexContainer } />

          <section className="recipe-detail-info">
            <figure>
              <img src={recipe.image_url} alt={recipe.name} />
            </figure>
            <ul>
              <li><h2>{recipe.name}</h2></li>
              <li>Servings: {recipe.serving}</li>
              <li>Rating: {recipe.rating}</li>
              <li>Description: {recipe.description}</li>
              <li>Directions: {recipe.directions}</li>
              <li>Notes: {recipe.notes}</li>
              <li>Link: {recipe.link}</li>
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

export default RecipeDetail;
