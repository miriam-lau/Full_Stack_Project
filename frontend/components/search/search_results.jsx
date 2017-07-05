import React from "react";
import { Link } from "react-router-dom";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

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
        <div className="search-results-nav-bar"></div>
        <div className="search-result">
          {this.ErrorMessage()}
          {this.props.searchItems.map((item, idx) => {
            return (
              <div key={idx} className="search-item-info">
                <span>Item Name: {item.name}</span>
                <span>Category: {item.category}</span>
                <span>Quantity: {item.quantity}</span>
                <span>Unit: {item.unit}</span>
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
