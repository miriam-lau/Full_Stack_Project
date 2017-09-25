import React from "react";
import { Link } from "react-router-dom";

import { GridTile } from "material-ui";
import { gridTileStyle } from "../utils/material_ui_styles";
import IconButton from "material-ui/IconButton";

class RecipeIndexItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const recipe = this.props.recipe;

    return (
      <div className="recipe-item">
        <Link to={ `/recipes/${recipe.id}` }>
          <GridTile style={ gridTileStyle } key={ recipe.image_url }
            title={ recipe.name }>
            <div id="recipe-item-img-div">
              {recipe.image_url != "" ?
                <img src={ recipe.image_url } id="recipe-item-img" /> :
                <img id="recipe-item-img"
                    src="https://res.cloudinary.com/miriam-lau/image/upload/c_scale,w_300/v1499837766/recipe_img_ifau7s.jpg"
                />
              }
            </div>
          </GridTile>
        </Link>
      </div>
    );
  }
}

export default RecipeIndexItem;
