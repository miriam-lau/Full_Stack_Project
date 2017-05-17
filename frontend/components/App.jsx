import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';
import SignUpFormContainer from './session_form/sign_up_form_container';
import SignInFormContainer from './session_form/sign_in_form_container';
import { AuthRoute, Link } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <h1>Welcome to Pantry!</h1>
      <GreetingContainer />
    </header>

    <Switch>
      <AuthRoute path='/signin' component={ SignInFormContainer } />
      <AuthRoute path='/signup' component={ SignUpFormContainer } />
    </Switch>
  </div>
);

export default App;
