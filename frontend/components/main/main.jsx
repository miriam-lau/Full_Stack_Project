import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { AuthRoute } from "../../util/route_util";

import GroceryIndexContainer from "../grocery/grocery_index_container";
import HomeContainer from "../home/home_container";
import PantryIndexContainer from "../pantry_items/pantry_index_container";
import PersonalGreetingContainer from "./personal_greeting_container";
import RecipeDetailContainer from "../recipe/recipe_detail_container";
import RecipeFormContainer from "../recipe/recipe_form_container";
import RecipeIndexContainer from "../recipe/recipe_index_container";
import SearchResultsContainer from "../search/search_results_container";
import FontIcon from "material-ui/FontIcon";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser, signout } = this.props;
    if (currentUser) {
      return (
        <div>
          <div className="header-bar">
            <PersonalGreetingContainer currentUser={currentUser} signout={signout} />
          </div>

          <div className="greeting-wrapper">
            <div className="side-nav-bar">
              <div>
                <Link className="nav-titles" to="/pantry_items">
                  <span className="nav-titles-img"><i className="material-icons fridge">kitchen</i></span>
                  <span className="nav-titles-options">Pantry</span>
                </Link>
              </div>

              <div className="side-nav-bar-options">
                <Link className="nav-titles" to="/groceries">
                  <span className="nav-titles-img"><i className="fa fa-shopping-basket fa-lg" aria-hidden="true"></i></span>
                  <span className="nav-titles-options">Grocery</span>
                </Link>
              </div>

              <div>
                <Link className="nav-titles" to="/recipes">
                  <span className="nav-titles-img-recipes"><i className="fa fa-book fa-lg" aria-hidden="true"></i></span>
                  <span className="nav-titles-options">Recipes</span>
                </Link>
              </div>
            </div>

            <div className="item-list">
              <Switch>
                <Route path="/groceries" component={ GroceryIndexContainer } />
                <Route path="/pantry_items"
                  component={ PantryIndexContainer } />
                <Route exact path="/recipes"
                  component={ RecipeIndexContainer } />
                <Route exact path="/recipes/new"
                  component={ RecipeFormContainer } />
                <Route exact path="/recipes/:id"
                  component={ RecipeDetailContainer } />
                <Route exact path="/search"
                  component={ SearchResultsContainer } />
              </Switch>
            </div>
          </div>
      </div>
      )
    } else {
      return (
        <div>
          <AuthRoute exact path="/" component={ HomeContainer }/>
          <Redirect to="/" />
        </div>
      )
    }

  }
}

export default Main;
