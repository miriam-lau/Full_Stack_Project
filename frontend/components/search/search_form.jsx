import React from 'react';

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

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();
    this.setState({toggle: !this.state.toggle});
  }

  handleUpdateInput(inputValue) {
    this.setState({name: inputValue}, () => {
      const name = this.state.name
      console.log("in search form handle Update");
      console.log(this.state);
      this.props.requestAllSearchItems({name}).then(() => {
        this.setState({dataSource: this.props.searchItems})
      });
    })
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
              <div className="search-field">
                <AutoComplete
                  hintText="Search for a pantry or grocery item"
                  dataSource={this.state.dataSource}
                  onUpdateInput={this.handleUpdateInput}
                  style={searchBoxStyle}
                  fullWidth={true}
                />
              </div> : "" }
        </div>
      </div>
    );
  }
}

export default SearchForm;
