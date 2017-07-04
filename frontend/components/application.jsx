import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, Link } from '../util/route_util';

import MainContainer from './main/main_container';
import HomeContainer from './home/home_container';
import PantryIndexContainer from './pantry_items/pantry_index_container';
import ModalContainer from './modal/modal_container';
import SearchResultsContainer from './search/search_results_container';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const App = () => {
  return (
    <div>
      <MainContainer />
    </div>
  );
}

export default App;
