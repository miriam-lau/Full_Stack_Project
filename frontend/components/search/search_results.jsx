import React from "react";
import { Link } from "react-router-dom";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
    Returns an error message if no item matching the search inputValue in the pantry or grocery is found.
  */
  ErrorMessage() {
    if (this.props.searchItems.length === 0) {
      return (
        <div className="search-error">No items found. Try again.</div>
      );
    }
    return null;
  }

  render() {
    return(
      <div>
        <div>
          <img className="side-nav-img"
              src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447620/side_nav_pantry_f4sutn.png" alt="side-bar-img-pantry"
          />
        </div>
        
        <div className="search-result">
          { this.ErrorMessage() }
          {this.props.searchItems.map((item, idx) => {
            return (
              <div key={ idx } className="search-item-info">
                <span>Item Name: { item.name }</span>
                <span>Category: { item.category }</span>
                <span>Quantity: { item.quantity }</span>
                <span>Unit: { item.unit }</span>
                <br/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SearchResults;
