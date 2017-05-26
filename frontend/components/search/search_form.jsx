import React from 'react';
import { Route } from 'react-router-dom';
import SearchResults from './search_results.jsx';

import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import AutoComplete from 'material-ui/AutoComplete';
import injectTapEventPlugin from 'react-tap-event-plugin';

const searchBoxStyle = {
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "10px",
  "fontWeight": "bold",
  "display": "inline",
  "borderColor": "#333399",
  "backgroundColor": "white",
  "paddingLeft": "10px",
  "paddingBottom": "0",
  "paddingTop": "0",
  "height": "45px"
}

const searchIcon = {
  "color": "white"
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dataSource: [], name: "", toggle: false};
    injectTapEventPlugin();
    this.searchResults = [];
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.onNewRequest = this.onNewRequest.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();
    this.setState({toggle: !this.state.toggle});
  }

  handleUpdateInput(inputValue) {
    this.setState({name: inputValue}, () => {
      const name = this.state.name
      this.props.requestAllSearchItems({name})
      .then((searchItems) => {
        // console.log("in handle update input");
        // console.log(searchItems);
        // console.log("search items to search results");
        let searchResults = searchItems;
        // console.log(this.searchResults);
        let retrievedSearchTerms = searchResults.map(function(result) {
          return result.name;
        })
        this.setState({dataSource: retrievedSearchTerms});
        // console.log("in handle Update see state");
        // console.log(this.state.dataSource);
      });
    });
  }

  // onNewRequest(searchTerm) {
  // }

  handleSubmit() {
        this.props.history.push("/search");
  }

  render() {
    return (
      <div className="search-form-container">
        <div className="search-form-div">
          <i id="search-icon"
            className="material-icons"
            style={searchIcon}
            onClick={this.handleToggle}>search</i>
          {this.state.toggle ?
            <form onSubmit={this.handleSubmit} >
              <div className="search-field">
                <AutoComplete
                  hintText="Search for a pantry or grocery item"
                  dataSource={this.state.dataSource}
                  onUpdateInput={this.handleUpdateInput}
                  style={searchBoxStyle}
                  fullWidth={true}
                />
              </div>
            </form>  : ""
          }
        </div>
      </div>
    );
  }
}

export default SearchForm;

// {this.props.map(item => {
//   console.log("in search-form dataSource");
//   console.log(this.state.dataSource);
//   console.log("in search_form");
//   console.log(item);
//   return (<SearchResults
//     key={item.id}
//     searchResult={item} />
//   )
// })}
