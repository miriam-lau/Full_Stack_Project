import React from 'react';
import { Route } from 'react-router-dom';
import RecipeIndexContainer from './recipe_index_container';

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    console.log("in recipe detail constructor");
  }

  componentDidMount() {
    this.props.requestRecipe(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.requestRecipe(nextProps.match.params.id);
    }
  }

  render() {
    const recipe = this.props.recipes
    if (!recipe) return null;
    console.log("in recipe detail render");
    return (
      <section className="recipe-detail">
        <Link to="/recipes">Back to Recipes</Link>
        <Route exact path="/recipes" component={ RecipeIndexContainer } />

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
    );
  }
}

export default RecipeDetail;
