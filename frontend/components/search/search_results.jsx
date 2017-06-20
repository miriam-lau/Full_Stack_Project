import React from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this
  }

  ErrorMessage() {
    if (this.props.searchItems.length === 0) {
      return (
        <div>No items found. Try again.</div>
      );
    } else {
      return null;
    }
  }

  render() {
    return(
      <div>
        {this.ErrorMessage()}
        {this.props.searchItems.map((item, idx) => {
          return (
            <div className="search-item-info">
              <span>Item Name: {item.name}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Unit: {item.unit}</span>
              <br/>
            </div>
          )
        })}
      </div>
    )
  }
}

export default SearchResults;
