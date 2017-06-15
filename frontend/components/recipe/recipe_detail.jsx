import React from 'react';
// import { Route } from 'react-router-dom';

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
        <Link exact to="/recipes">Back to Recipes</Link>

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

        <Route exact path="/recipes" component={ RecipeIndexContainer } />
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
