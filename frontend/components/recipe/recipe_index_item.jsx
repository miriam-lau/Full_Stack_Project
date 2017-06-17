import React from 'react';
import { Link, Route } from 'react-router-dom';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import RecipeDetailContainer from './recipe_detail_container';

class RecipeIndexItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const recipe = this.props.recipe;
    return (
      <div className="recipe-info">
        <Link to={`/recipes/${recipe.id}`}>
          <GridTile
            key={recipe.image_url}
            title={recipe.name}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
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
//
// >
// <img src={tile.img} />
