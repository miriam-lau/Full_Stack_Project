import React from "react";
import { Route } from "react-router-dom";

import SearchResults from "./search_results.jsx";
import { AutoComplete, FontIcon, TextField } from "material-ui";
import { searchStyle, textStyle, searchFontStyle, underlineStyle, searchIcon } from "./material_ui_styles";


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dataSource: [], name: ""};

    this.searchResults = [];
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdateInput(inputValue) {
    this.setState({name: inputValue}, () => {
      const name = this.state.name
      this.props.requestAllSearchItems({name})
      .then((searchItems) => {
        let searchResults = searchItems
        let retrievedSearchTerms = searchResults.map(function(result) {
          return result.name;
        })
        this.setState({dataSource: retrievedSearchTerms});
      });
    });
  }


  handleSubmit() {
    this.props.history.push("/search");
  }

  render() {
    return (
      <div className="search-form-container">
        <div className="search-form-div">
          <i id="search-icon" className="material-icons"
            style={searchIcon}>search</i>
          <form onSubmit={this.handleSubmit} >
            <div className="search-field">
              <AutoComplete
                underlineShow={false}
                style={searchStyle}
                textFieldStyle={textStyle}
                hintStyle={searchFontStyle}
                hintText="Search for a pantry or grocery item"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                fullWidth={true}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchForm;
