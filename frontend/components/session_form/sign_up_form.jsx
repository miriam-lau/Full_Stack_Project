import React from 'react';
import { Link } from 'react-router-dom';

function ErrorBanner(props) {
  if (!props.shouldShow) {
    return null;
  } else {
    return (
      <div className="sign-up-error">
        { props.message }
      </div>
    );
  }
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '',
      re_entered_password: '', matching_passwords: "true" };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  update(property) {
    return event => this.setState({ [property]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.re_entered_password) {
      this.setState({matching_passwords: false});
    } else {
      this.setState({matching_passwords: true});
      const user = this.state;
      return this.props.signup({user})
        .then( () => {
          this.props.history.push('/pantry_items');
        })
    }
  }

  handleGuestSignIn(event) {
    event.preventDefault();
    const user = {username: 'guest', password: 'password'};
    this.props.signin({user}).then( () => {this.props.history.push('/pantry_items');
    })
  }

  renderErrors() {
    let signUpErrors = (this.props.errors == undefined ? [] : this.props.errors);
    return (
      <ul className="sign-up-error">
        { signUpErrors.map((error, i) => (
          <li key={`error-${i}`}>{ error }</li>
        ))}
      </ul>
    );
  }

  render() {
    return(
      <div className="session-form-container">
        <form onSubmit={ this.handleSubmit }>
          <div className="form-greeting">
            <h3>myPantry</h3>
          </div>
          <br />

          <div className="session-form">
            <h2 className="session-title">Create Account</h2>
            <br />

            <label>Username</label>
            <br />
            <input type="text" value={ this.state.username }
              onChange={ this.update('username') }
              className="signup-input" />
            <br />
            <br />

            <label>Email</label>
            <br />
            <input type="text" value={ this.state.email }
            onChange={ this.update('email') }
            className="signup-input" />
            <br />
            <br />

            <label>Password</label>
            <br />
            <input type="password" value={ this.state.password }
              onChange={ this.update('password') }
              className="signup-input" />
            <br />
            <br />

            <label>Re-enter Password</label>
            <br />
            <input type="password" value={ this.state.re_entered_password }
              onChange={ this.update('re_entered_password') }
              className="signup-input" />

            <ErrorBanner shouldShow={!this.state.matching_passwords}
              message="Passwords must match" />
            <br />
            <br />
            <div>
              { this.renderErrors() }
            </div>
            <br />
            <input className="session-button" type="submit"
              value="Create Account" />
          </div>
        </form>
        <br />
        <br />
        <button className="guest-session-button" onClick={ this.handleGuestSignIn }>Guest Sign In</button>
      </div>
    );
  }
}

export default SignUpForm;
