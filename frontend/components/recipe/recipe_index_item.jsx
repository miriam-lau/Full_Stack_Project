import React from "react";
import { Link } from "react-router-dom";

import { GridTile } from "material-ui";
import IconButton from "material-ui/IconButton";

const styles = {
  gridTile: {
    width: 270,
    height: 200,
    overflowY: "hidden",
    objectfit: "cover",
    borderRadius: "5px",
    marginRight: "15px",
    marginTop: "15px",
    marginLeft: "15px"
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
            <div id="recipe-detail-img-div">
              {recipe.image_url != "" ?
                <img src={recipe.image_url} id="recipe-detail-img" /> :
                <img src="http://res.cloudinary.com/miriam-lau/image/upload/v1499811084/recipe-default_pc7b4b.jpg"
                    id="recipe-detail-img" />
              }
            </div>
          </GridTile>
        </Link>
      </div>
    );
  }
}

export default RecipeIndexItem;
