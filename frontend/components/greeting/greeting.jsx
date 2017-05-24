import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import PantryIndexContainer from '../pantry_items/pantry_index_container';
import GroceryIndexContainer from '../grocery/grocery_index_container';
import ModalForm from '../modal/modal_form';

const sessionLinks = ({signin, signup, errors, clearErrors}) => {
  return(
    <nav className="header-group">
      <div className="header">
        <h1 className="greeting">myPantry</h1>
      </div>
      <div className="header">
        <div className="nav-link">
          <Link className="link" to="/">Home Page</Link>
        </div>
        <div className="nav-link">
          <ModalForm
            signInForm={true}
            signin={signin}
            errors={errors}
            clearErrors={clearErrors}
          />
        </div>
        <div className="nav-link">
          <ModalForm
            signInForm={false}
            signin={signin}
            signup={signup}
            errors={errors}
            clearErrors={clearErrors}
          />
        </div>
      </div>
    </nav>
  )
};

const personalGreeting = (currentUser, signout) => (
  <nav className="header-group2">
    <div className="header">
      <h1 className="greeting">myPantry</h1>
    </div>

    <div className="header">
      <section className="header2">
        <h2 className="header-name">Hello, { currentUser.username }!</h2>
      </section>
      <section className="header2">
        <Link className="header-button" onClick={ signout } to="/">Sign Out</Link>
      </section>
    </div>

  </nav>
);

const Greeting = ({ currentUser, signin, signup, signout, clearErrors }) => {
  if (currentUser) {
    return (
      <div className="greeting-wrapper">
        <div className="greeting-one">
          { personalGreeting(currentUser, signout) }
        </div>

        <div className="greeting-two">
          <div>
            <ul>
              <div >
                <Link className="nav-titles" to="/groceries">Grocery</Link>
              </div>
              <div>
                <Link className="nav-titles" to="/pantry_items">Pantry</Link>
              </div>
            </ul>
          </div>

          <div className="greeting-nav-background">
          </div>

        </div>

        <div className="greeting-three">
          <Switch>
            <Route path="/pantry_items" component={PantryIndexContainer} />
            <Route path="/groceries" component={GroceryIndexContainer} />
          </Switch>
        </div>

        <div className="greeting-four">
          <footer className="footer">
            <div>Copyright 2017 myPantry. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        {sessionLinks({signin, signup, clearErrors})}
      </div>
    )
  }
};

export default Greeting;
