import React from 'react';
import { Link } from 'react-router-dom';

import Conversion from '../conversion_chart/conversion';
import Tutorial from '../tutorial/tutorial';
import SearchFormContainer from '../search/search_form_container';

class PersonalGreeting extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    return this.props.signout().then(() => { this.props.history.push('/') });
  }

  render() {
    return (
      <nav className="header-group2">
        <div className="header">
          <h1 className="greeting">myPantry</h1>
          <div className="search-bar"><SearchFormContainer /></div>
        </div>

        <div className="header">
          <section className="header2">
            <h2 className="header-name">Hello, &nbsp;
              { this.props.currentUser.username }!</h2>
          </section>

          <section className="header2"><Tutorial /></section>
          <section className="header2"><Conversion /></section>

          <section className="header2">
            <button className="header-link"
              onClick={ this.handleClick }>Sign Out</button>
          </section>
        </div>
      </nav>
    )
  }
}

export default PersonalGreeting;
