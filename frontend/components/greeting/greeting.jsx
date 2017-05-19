import React from 'react';
import { Route, Link } from 'react-router-dom';
import PantryIndexContainer from '../pantry_items/pantry_index_container';

const sessionLinks = (clearErrors) => (
  <nav>
    <span className="nav-link">
      <Link className="link" to="/">Home Page</Link>
    </span>
    <span className="nav-link">
      <Link onClick={clearErrors} className="link" to="/signin">Sign In</Link>
    </span>
    <span className="nav-link">
      <Link onClick={clearErrors} className="link" to="/signup">Create Account</Link>
    </span>

  </nav>
);

const personalGreeting = (currentUser, signout) => (
  <div className="header-group">
    <div className="header">
      <h2 className="header-name">Hello, { currentUser.username }!</h2>
    </div>
    <div className="header">
      <Link className="header-button" onClick={ signout } to="/">Sign Out</Link>
    </div>
    <div>
    </div>
  </div>
);

const Greeting = ({ currentUser, signout, clearErrors }) => {
  return (
    <div>
      {currentUser ? personalGreeting(currentUser, signout) : sessionLinks(clearErrors)}
    </div>
  )
};

export default Greeting;

// <Route exact path="/pantry_items" component={ PantryIndexContainer } />
