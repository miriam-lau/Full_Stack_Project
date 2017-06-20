import React from 'react';
import { Link } from 'react-router-dom';

function ErrorBanner(props) {
  if (this.props.searchItems.length === 0) {
    return (
      <div>No items found. Try again.</div>
    );
  } else {
    return null;
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this
  }

  // errorMessage() {
  //   if (this.props.searchItems.length === 0) {
  //     return "No items found. Try again."
  //   } else {
  //     return null
  //   }
  // }

  render() {
    console.log("in search results");
    console.log(this.props.searchItems);
    return(
      <div>
        <ErrorBanner />
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
