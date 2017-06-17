import React from 'react';
import { Link, Route } from 'react-router-dom';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import RecipeDetailContainer from './recipe_detail_container';

const styles = {
  gridTile: {
    width: 280,
    height: 210,
    overflowY: 'auto',
  },
}


class RecipeIndexItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const recipe = this.props.recipe;
    return (
      <div className="recipe-info">
        <Link to={`/recipes/${recipe.id}`}>
          <GridTile style={styles.gridTile}
            key={recipe.image_url}
            title={recipe.name}
            subtitle={<span>by me</span>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
            <img src={recipe.image_url} id="recipe-detail-img"/>
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
