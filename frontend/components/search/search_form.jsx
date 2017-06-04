import React from 'react';
import { Route } from 'react-router-dom';
import SearchResults from './search_results.jsx';

import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import AutoComplete from 'material-ui/AutoComplete';


const searchBoxStyle = {
  "borderColor": "#d7e7f5",
  "backgroundColor": "white",
  "paddingLeft": "10px",
  "paddingBottom": "0",
  "paddingTop": "0",
  "height": "45px"
}

const searchBoxFontStyle = {
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "14px",
  "fontWeight": "bold",
  "display": "inline",
}

const textboxUnderlineStyle = {
  'borderColor': '#d7e7f5'
}

const searchIcon = {
  "color": "white"
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dataSource: [], name: "", toggle: false};

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
        let searchResults = searchItems;
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
          <i id="search-icon"
            className="material-icons"
            style={searchIcon}
            onClick={this.handleToggle}>search</i>
          {this.state.toggle ?
            <form onSubmit={this.handleSubmit} >
              <div className="search-field">
                <AutoComplete
                  underlineFocusStyle ={textboxUnderlineStyle}
                  style={searchBoxStyle}
                  hintStyle={searchBoxFontStyle}
                  hintText="Search for a pantry or grocery item"
                  dataSource={this.state.dataSource}
                  onUpdateInput={this.handleUpdateInput}
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
