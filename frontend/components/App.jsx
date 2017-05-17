import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';
import SignUpFormContainer from './session_form/sign_up_form_container';
import SignInFormContainer from './session_form/sign_in_form_container';
import { AuthRoute, Link } from '../util/route_util';

const App = () => (
  <div>
    <section className="nav-bar">
      <div>
        <p className="logo">LOGO</p>
      </div>
      <header>
        <h1 className="greeting">Welcome to Pantry!</h1>
      </header>
      <div>
        <GreetingContainer />
      </div>
    </section>
    <Switch>
      <AuthRoute path='/signin' component={ SignInFormContainer } />
      <AuthRoute path='/signup' component={ SignUpFormContainer } />
    </Switch>
    <section className="image-snaps">
      
    </section>
    <footer>
      <div className="footer">Copyright 2017 Company. All rights reserved.
      </div>
    </footer>
  </div>
);

export default App;
