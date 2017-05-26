import React from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div id="locate">
        {this.props.searchItems.map(item => {
          return(
            <div>
            <p>hi</p>
            <span>{item.name}</span>
            <span>{item.quantity}</span>
            <span>{item.unit}</span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default SearchResults;

// {searchItems.map(item => {
//   console.log("in search form");
//   console.log(item);
// })
// }
