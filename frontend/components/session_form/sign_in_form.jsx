import React from 'react';
import { Link } from 'react-router-dom';
import SignUpFormContainer from './sign_up_form_container';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  update(property) {
    return event => this.setState({ [property]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    this.props.receiveCurrentUser({user})
      .then( () => {
        this.props.history.push('/pantry_items');
      })
  }

  renderErrors() {
    return (
      <div >
        <ul className="sign-up-error">
        { this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{ error }</li>
        ))}
      </ul>
    </div>
    );
  }

  render() {
    return(
      <div className="session-form-container">
        <form onSubmit={ this.handleSubmit }>
          <br />
          <div className="session-form">
            <h2 className="session-title">Sign In</h2>
            <br />

            <label>Username</label>
            <br />
            <input type="text" value={ this.state.username }
              onChange={ this.update('username') }
              className="signin-input" />
            <br />
            <br />

            <label>Password</label>
            <br />
            <input type="password" value={ this.state.password }
              onChange={ this.update('password') }
              className="signin-input" />
            <br />
            <br />
            <div>
              { this.renderErrors() }
            </div>
            <br />

            <input className="session-button" type="submit" value="Sign In" />
          </div>
        </form>
        <div className="session-form">
          <br />
          <h3 className="session-question">New to Pantry?</h3>
          <div className="button-link">
            <Link onClick={this.props.clearErrors} to="/signup">Create Account</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInForm;
