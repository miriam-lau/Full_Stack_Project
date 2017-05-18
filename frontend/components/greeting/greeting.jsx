import React from 'react';
import { Link } from 'react-router-dom';

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
  <hgroup className="header-group">
    <h2 className="header-name">Hello, { currentUser.username }!</h2>
    <button className="header-button" onClick={ signout }>Sign Out</button>
  </hgroup>
);

const Greeting = ({ currentUser, signout, clearErrors }) => (
  currentUser ? personalGreeting(currentUser, signout) : sessionLinks(clearErrors)
);

export default Greeting;
