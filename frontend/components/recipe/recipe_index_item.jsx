import React from 'react';
import { Link, Route } from 'react-router-dom';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';

import RecipeDetailContainer from './recipe_detail_container';

const styles = {
  gridTile: {
    width: 270,
    height: 200,
    overflowY: 'hidden',
    objectfit: 'cover',
    borderRadius: '5px',
    marginRight: '15px',
    marginTop: '15px',
    marginLeft: '15px',
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
          >
            <img src={recipe.image_url} id="recipe-detail-img"/>
          </GridTile>
        </Link>
      </div>
    );
  }
}

export default RecipeIndexItem;
