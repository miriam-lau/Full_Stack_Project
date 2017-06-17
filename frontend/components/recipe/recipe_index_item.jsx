import React from 'react';
import { Link, Route } from 'react-router-dom';

import {GridList, GridTile} from 'material-ui/GridList';

import RecipeDetailContainer from './recipe_detail_container';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

class RecipeIndexItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const recipe = this.props.recipe;
    return (
      <div className="recipe-info">
        <Link to={`/recipes/${recipe.id}`}>
          <GridTile>
            <div>{recipe.name}</div>
            <img src={recipe.image_url} className="recipe-detail-img"/>
          </GridTile>
        </Link>
      </div>
    );
  }
}

export default RecipeIndexItem;

// key={tile.img}
// title={tile.title}
// subtitle={<span>by <b>{tile.author}</b></span>}
// actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
// >
// <img src={tile.img} />
