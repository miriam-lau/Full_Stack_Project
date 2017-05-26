import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import PantryIndexContainer from '../pantry_items/pantry_index_container';
import GroceryIndexContainer from '../grocery/grocery_index_container';
import ModalFormContainer from '../modal/modal_container';
import SearchFormContainer from '../search/search_form_container';

const sessionLinks = ({modalOpen, openModal, signin, signup, errors, clearErrors}) => {
  return(
    <nav className="header-group">
      <div className="header">
        <h1 className="greeting">myPantry</h1>
      </div>

      <div className="header">
        <div className="nav-link">
          <button onClick={openModal("signin")}>Sign In</button>
        </div>
        <div className="nav-link">
          <button onClick={openModal("signup")}>Create Account</button>
        </div>
        <ModalFormContainer openModal={openModal} modalOpen={modalOpen} />
      </div>
    </nav>
  )
};

const personalGreeting = (currentUser, signout) => (
  <nav className="header-group2">
    <div className="header">
      <h1 className="greeting">myPantry</h1>

      <div className="search-bar">
        <SearchFormContainer />
      </div>
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

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({modalOpen: ""});
    this.openModal = this.openModal.bind(this);
  }

  openModal(type) {
    return () => this.setState({modalOpen: type});
  }

  render() {
    const { currentUser, signin, signup, signout, errors, clearErrors } = this.props;
    const openModal = this.openModal;
    const {modalOpen} = this.state;
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

            <div className="greeting-nav-background"></div>
        </div>

        <div className="greeting-three">
          <Switch>
            <Route path="/pantry_items" component={PantryIndexContainer} />
            <Route path="/groceries" component={GroceryIndexContainer} />
          </Switch>
        </div>

        <div className="greeting-four">
          <footer className="footer">
            <div>Copyright 2017 myPantry. All rights reserved.</div>
          </footer>
        </div>
      </div>
      )
    } else {
      return (
        <div>
        {sessionLinks({modalOpen, openModal, signin, signup, errors, clearErrors})}
        </div>
      )
    }

  }
}

export default Greeting;
