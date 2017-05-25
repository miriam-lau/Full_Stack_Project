import React from 'react';

import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

const textboxUnderlineStyle = {
  'borderColor': '#333399'
}

const addItemTextBoxStyle = {
  "fontFamily": "'Nunito', sans-serif",
  "fontSize": "14px",
  "fontWeight": "bold",
  "width": "450px",
  "display": "inline",
  "marginLeft": "20px"
}

// const fontstyle = {
//   "color": "#333399",
//   "cursor": "pointer"
// }

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput = "";
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //
  // }

  render() {
    return(
      <div className="search-form-container">
        <form className="search-form" onSubmit={this}>
          <div className="search-form-div">

            <i id="search-icon"
              className="material-icons"
              onClick={this}>search</i>

            <TextField id="text-field-default"
            value={this.searchInput}
            underlineFocusStyle ={textboxUnderlineStyle}
            style={addItemTextBoxStyle}
            hintText="e.g. '2 Oranges' or '3 cups Milk'"
            />
          </div>
        </form>
      </div>
    )
  }
}

export default SearchForm;

// onChange={this.update('temp')}
