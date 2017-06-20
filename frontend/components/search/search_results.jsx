import React from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("in search results");
    console.log(this.props.searchItems);
    return(
      <div>
        {this.props.searchItems.map((item) => {
          return(
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
