import React from 'react';

import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import AutoComplete from 'material-ui/AutoComplete';

const searchBoxStyle = {
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "14px",
  "fontWeight": "bold",
  "display": "inline",
  "borderColor": "#333399"
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dataSource: []};
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleUpdateInput(value) {
    event.preventDefault();
    this.setState({
      dataSource: []
    });
    console.log("in search form");
  };

  render() {
    return (
      <div className="search-form-container">
        <div className="search-form-div">
            <i id="search-icon"
              className="material-icons"
              onClick={this.handleUpdateInput}>search</i>
            <div className="search-field">
              <AutoComplete
                hintText="Search for a pantry or grocery item"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                style={searchBoxStyle}
                fullWidth={true}
              />
            </div>
        </div>
      </div>
    );
  }
}

export default SearchForm;
