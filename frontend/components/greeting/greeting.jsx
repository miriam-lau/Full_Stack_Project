import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import GroceryIndexContainer from '../grocery/grocery_index_container';
import ModalFormContainer from '../modal/modal_container';
import PantryIndexContainer from '../pantry_items/pantry_index_container';
import PersonalGreetingContainer from './personal_greeting_container';
import RecipeDetailContainer from '../recipe/recipe_detail_container';
import RecipeIndexContainer from '../recipe/recipe_index_container';
import SearchResultsContainer from '../search/search_results_container';


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
        <div>
          <div className="header-bar">
            <PersonalGreetingContainer currentUser={currentUser} signout={signout} />
          </div>
          <div className="greeting-wrapper">
            <div className="side-nav-bar">
              <div>
                <ul>
                  <div >
                    <Link className="nav-titles" to="/groceries">Grocery</Link>
                  </div>

                  <div>
                    <Link className="nav-titles" to="/pantry_items">Pantry</Link>
                  </div>

                  <div>
                    <Link className="nav-titles" to="/recipes">Recipe</Link>
                  </div>
                </ul>
              </div>
            </div>

            <div className="greeting-nav-background"></div>

            <div className="item-list">
              <Switch>
                <Route path="/groceries" component={ GroceryIndexContainer } />
                <Route path="/pantry_items" component={ PantryIndexContainer } />
                <Route exact path="/recipes" component={ RecipeIndexContainer } />
                <Route path="/recipes/:id" component={ RecipeDetailContainer } />
                <Route path='/search' component={ SearchResultsContainer } />
              </Switch>
            </div>
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
