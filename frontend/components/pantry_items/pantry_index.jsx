import React from 'react';
// import PantryIndexItem from './pantry_index_item';

class PantryIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.requestAllPantryItems();
  }

  render() {
    return (
      <div>
        <ul>
          <li>hello</li>
          {this.props.pantry_items.map((item, idx) =>
            <li key={idx}>{item.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default PantryIndex;


// <li><PantryIndexItem key={item.id} pantry_item={item} /></li>
