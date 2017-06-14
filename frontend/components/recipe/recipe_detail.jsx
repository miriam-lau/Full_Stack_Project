import React from 'react';
import { Route } from 'react-router-dom';

class RecipeDetail extends React.Component {
  componentDidMount() {
    this.props.requestRecipe(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.requestRecipe(nextProps.match.params.id);
    }
  }

  render() {
    const recipe = this.props.recipe
    if (!recipe) return null;

    return (
      <section className="recipe-detail">
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

// <section className="toys">
// <h3>Items</h3>
// <ul className="toy-list">
// {items.map(item => <Item key={item.name} item={item} />)}
// </ul>
// </section>
//
// <Route path="/recipe/:id/item/:itemId" component={ItemDetailContainer} />
