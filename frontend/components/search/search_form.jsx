import React from "react";
import { Route } from "react-router-dom";

import SearchResults from "./search_results.jsx";
import { AutoComplete, FontIcon, TextField } from "material-ui";
import { searchStyle, searchTextStyle, searchFontStyle, searchIcon } from
    "../utils/material_ui_styles";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: [], name: "" };

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
    On update, sets "name" in state to inputValue, and runs the requestAllSearchItems action for the inputValue.  Result from the action is returned as an array.
    @param {inputValue} pantry or grocery item
  */
  handleUpdateInput(inputValue) {
    this.setState({ name: inputValue }, () => {
      const name = this.state.name
      this.props.requestAllSearchItems({name}).then((searchItems) => {
        // let retrievedSearchTerms = searchItems.map(function(result) {
        //   return result.name;
        // });

        let retrievedSearchTerms = [];
        if (searchItems.length == 1) {
          retrievedSearchTerms.push(searchItems);
        } else if (searchItems.length > 1) {
          searchItems.map((result) => {
            retrievedSearchTerms.push(result.name);
          });
        }

        this.setState({ dataSource: retrievedSearchTerms });
      });
    });
  }

  // On submit, pushes to path "/search".
  handleSubmit() {
    this.props.history.push("/search");
  }

  render() {
    return (
      <div className="search-form-container">
        <div className="search-form-div">
          <i id="search-icon" className="material-icons"
            style={ searchIcon }>search</i>
          <form onSubmit={ this.handleSubmit } >
            <div className="search-field">
              <AutoComplete
                underlineShow={ false }
                style={ searchStyle }
                textFieldStyle={ searchTextStyle }
                hintStyle={ searchFontStyle }
                hintText="Search for a pantry or grocery item"
                dataSource={ this.state.dataSource }
                onUpdateInput={ this.handleUpdateInput }
                fullWidth={ true }
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchForm;
