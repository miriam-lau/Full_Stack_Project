import React from 'react';
import PantryIndexItem from './pantry_index_item';

class PantryIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.requestAllPantryItems();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <ul>
          {this.props.map(item =>
            <PantryIndexItem key={item.id} pantry_item={item} />
          )}
        </ul>
      </div>
    );
  }
}

export default PantryIndex;
