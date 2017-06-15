import React from 'react';
import { Route, Link } from 'react-router-dom';
import RecipeIndexContainer from './recipe_index_container';

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    console.log("in recipe detail constructor");
    console.log(this.props.recipes);
  }

  componentDidMount() {
    console.log("in recipe detail component did mount");

    this.props.requestRecipe(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.requestRecipe(nextProps.match.params.id);
    }
  }

  render() {
    const recipes = this.props.recipes
    if (!recipes) return null;
    console.log("in recipe detail render");

    return (
      <section className="recipe-detail">
        <Link to="/recipes">Back to Recipes</Link>
        <Route exact path="/recipes" component={ RecipeIndexContainer } />

        <figure>
          <img src={recipes.image_url} alt={recipes.name} />
        </figure>
        <ul>
          <li><h2>{recipes.name}</h2></li>
          <li>Servings: {recipes.serving}</li>
          <li>Rating: {recipes.rating}</li>
          <li>Description: {recipes.description}</li>
          <li>Directions: {recipes.directions}</li>
          <li>Notes: {recipes.notes}</li>
          <li>Link: {recipes.link}</li>
        </ul>
      </section>
    );
  }
}

export default RecipeDetail;
