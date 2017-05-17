import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session_form/session_form_container';
import { AuthRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <h1>Welcome to Pantry!</h1>
      <GreetingContainer />
    </header>
    <Switch>
      <AuthRoute path='/signin' component={ SessionFormContainer } />
      <AuthRoute path='/signup' component={ SessionFormContainer } />
    </Switch>
  </div>
);

export default App;
