import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, Link } from '../util/route_util';

import GreetingContainer from './greeting/greeting_container';
import HomeContainer from './home/home_container';
import PantryIndexContainer from './pantry_items/pantry_index_container';
import ModalContainer from './modal/modal_container';
import SearchResultsContainer from './search/search_results_container';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const App = () => {
  return (
    <div id="wrapper">
      <div id="header">
          <div>
          <GreetingContainer />
          </div>
      </div>
    <div id="content">

      <Switch>
        <AuthRoute exact path='/' component={ HomeContainer }/>
        <AuthRoute path='/signin' component={ ModalContainer } />
        <AuthRoute path='/signup' component={ ModalContainer } />
      </Switch>

    </div>
  </div>);
}

export default App;
