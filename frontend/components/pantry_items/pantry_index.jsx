import React from 'react';

class PantryIndex extends React.Component {
  componentDidMount() {
    this.props.requestAllPantryItems();
  }

  render() {
    return (
      <div>
        <p>in pantry_index</p>
      </div>
    );
  }
}

export default PantryIndex;
