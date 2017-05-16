import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session_form/session_form_container';

const App = () => (
  <div>
    <header>
      <h1>Welcome to Pantry!</h1>
      <GreetingContainer />
    </header>
    <Switch>
      <Route path='/signin' component={ SessionFormContainer } />
      <Route path='/signup' component={ SessionFormContainer } />
    </Switch>
  </div>
);

export default App;
